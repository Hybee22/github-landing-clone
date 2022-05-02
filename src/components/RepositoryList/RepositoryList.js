import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { FiBook } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import formatDistance from "date-fns/formatDistance";

import Loading from "../Loading";

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const compareFunc = (a, b) => {
  if (a.created_at > b.created_at) return -1;
  return 0;
};

const SearchBar = ({ repos, setRepos, setShowLoading }) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = debounce(setSearchText, 500);

  useEffect(() => {
    setShowLoading(true);
    if (searchText !== "") {
      const filtered = repos.filter((repo) => {
        return repo.name.includes(searchText);
      });
      const sortedFiltered = filtered.sort(compareFunc);
      setTimeout(() => setShowLoading(false), 500);
      return setRepos(sortedFiltered);
    }
    // eslint-disable-next-line
  }, [searchText, setRepos, setShowLoading]);

  return (
    <Search
      onChange={({ target: { value } }) => debouncedSearchText(value)}
      placeholder="Find a repository..."
    />
  );
};

const RepoItem = ({ repo }) => {
  return (
    <>
      <RepoItemContainer key={repo.id}>
        <RepoInfo>
          <>
            <RepoName>
              <RepoLink href={repo.html_url}>{repo.name}</RepoLink>
              <RepoTypeSpan>{repo && repo.visibility}</RepoTypeSpan>
            </RepoName>
            <RepoDescription>{repo.description}</RepoDescription>
          </>

          <RepoExtraInfo>
            <RepoLanguage>
              <Pill />
              {repo && repo.language}
            </RepoLanguage>
            <RepoLastUpdated>
              Updated{" "}
              {formatDistance(Date.now(), new Date(repo.updated_at), {
                addSuffix: false,
              })}{" "}
              ago
            </RepoLastUpdated>
          </RepoExtraInfo>
        </RepoInfo>
        <RepoButtons></RepoButtons>
      </RepoItemContainer>
      <Divider />
    </>
  );
};

const RepositoryList = () => {
  const [repos, setRepos] = useState([]);

  const fetchRepos = () => {
    axios.get(`${user.repos_url}?page=1&per_page=20`).then(({ data }) => {
      const sortedData = data.sort(compareFunc);
      setTimeout(() => setShowLoading(false), 500);
      setRepos(sortedData);
    });
  };

  const user = useSelector((state) => state.auth.user);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    fetchRepos();
    return () => {};
    // eslint-disable-next-line
  }, [user.repos_url]);

  return (
    <Container>
      <SearchHeader>
        <SearchBar
          repos={repos}
          setRepos={setRepos}
          setShowLoading={setShowLoading}
        />
        <Buttons>
          <Button type="button">
            <ButtonText>Type</ButtonText>
            <span>
              <FaCaretDown style={{ marginLeft: "2px", fontSize: "14px" }} />
            </span>
          </Button>
          <Button type="button">
            <ButtonText>Language</ButtonText>
            <span>
              <FaCaretDown style={{ marginLeft: "2px", fontSize: "14px" }} />
            </span>
          </Button>
          <Button type="button">
            <ButtonText>Sort</ButtonText>
            <span>
              <FaCaretDown style={{ marginLeft: "2px", fontSize: "14px" }} />
            </span>
          </Button>
        </Buttons>
        <NewRepoButton type="button">
          <span>
            <FiBook
              style={{ marginRight: "5px", fontSize: "14px", color: "white" }}
            />
          </span>
          <ButtonText>New</ButtonText>
        </NewRepoButton>
      </SearchHeader>

      <Divider />

      <RepoContainer>
        {showLoading && <Loading />}
        {showLoading === false &&
          repos &&
          repos.map((repo) => <RepoItem repo={repo} key={repo.id} />)}
      </RepoContainer>

      {/* <Divider /> */}
    </Container>
  );
};

const Container = styled.div`
  /* background-color: lightgrey; */
  flex: 1;
`;

const Divider = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid hsla(210, 18%, 87%, 1);
  width: 100%;
`;

const Search = styled.input`
  border: 1px solid #d0d7de;
  padding: 8px 16px;
  height: 14px;
  margin: 5px;
  border-radius: 5px;
  width: 100%;

  &:focus {
    border: 1px solid #0969da !important;
  }
`;

const SearchHeader = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

const NewRepoButton = styled.button`
  background-color: #2da44e;
  color: #fff;
  padding: 8px 16px;
  margin: 5px;
  outline: none;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;

  cursor: pointer;
`;

const Button = styled.button`
  background-color: #f6f8fa;
  color: #24292f;

  padding: 8px 16px;
  margin: 5px;
  outline: none;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;

  cursor: pointer;

  > span {
    margin-top: 5px;
  }
`;

const ButtonText = styled.p`
  font-weight: 600;
`;

const RepoContainer = styled.div`
  margin: 0;
`;

const RepoItemContainer = styled.div`
  display: flex;
  padding: 24px 0;
`;

const RepoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RepoName = styled.h3`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #0969da;
  margin-right: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RepoTypeSpan = styled.span`
  font-size: 11px;
  display: inline-block;
  border-radius: 8px;
  border: 1px solid #57606a;
  color: #57606a;
  padding: 2px 7px;
  margin-left: 20px;
`;

const RepoLink = styled.a`
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const RepoDescription = styled.p`
  margin: 10px 0 15px;
  font-size: 15px;
`;

const RepoExtraInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RepoLanguage = styled.p`
  font-size: 13px;
  margin-right: 20px;
`;

const RepoLastUpdated = styled.p`
  font-size: 13px;
`;

const Pill = styled.span`
  position: relative;
  margin-right: 5px;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #3939c9;
  background-color: #3939c9;
  border-radius: 50%;
`;

const RepoButtons = styled.div``;

export default RepositoryList;
