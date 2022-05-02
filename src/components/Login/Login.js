import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GithubIcon from "mdi-react/GithubIcon";
import axios from "axios";
import history from "../../history/index.js";
import { authTypes } from "../../features/auth/authSlice";

const Login = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const { client_id, client_secret, redirect_uri } = state;
  const loginLink = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  useEffect(async () => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      // window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1],
        client_id,
        client_secret,
        redirect_uri,
      };
      const proxy_url = state.proxy_url;

      try {
        const { data } = await axios.post(proxy_url, requestData);
        dispatch({
          type: authTypes.LOGIN,
          payload: { user: data, isLoggedIn: true },
        });
        if (data.login) {
          history.push("/");
          window.location.replace("/");
        }
      } catch (error) {
        setData({
          isLoading: false,
          errorMessage: "Sorry! Login failed",
        });
      }
    }
    // eslint-disable-next-line
  }, [state, dispatch, data]);

  // if (state.isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Wrapper>
      <section className="container">
        <div>
          <h1 className="login-header">👋 Welcome</h1>
          <span>{data.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <a
                  className="login-link"
                  href={loginLink}
                  onClick={() => {
                    setData({ ...data, errorMessage: "" });
                  }}
                >
                  <GithubIcon />
                  <span>Login with GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial;

    > div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 25%;
      height: 45%;
      > h1 {
        font-size: 2rem;
        margin-bottom: 20px;
      }
      > span:nth-child(2) {
        font-size: 1.1rem;
        color: #808080;
        margin-bottom: 70px;
      }
      > span:nth-child(3) {
        margin: 10px 0 20px;
        color: red;
      }

      .login-header {
        font-size: 30px;
      }

      .login-container {
        background-color: #000;
        width: 70%;
        border-radius: 3px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: #494646;
        }

        > .login-link {
          padding: 5px;
          text-decoration: none;
          color: #fff;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          height: 40px;
          > span:nth-child(2) {
            margin-left: 5px;
          }
        }
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
        }
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
`;

export default Login;
