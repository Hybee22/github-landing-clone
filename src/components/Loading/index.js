import ReactLoading from "react-loading";
import styled from "styled-components/macro";

const index = () => {
  return (
    <Loading>
      <ReactLoading type="spin" color="#4c7299" height={100} width={50} />
    </Loading>
  );
};

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

export default index;
