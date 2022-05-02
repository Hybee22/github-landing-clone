import { Profile, RepositoryList } from "../../components";
import styled from "styled-components/macro";

const HomeContainer = () => {
  return (
    <Container>
      <Profile />
      <RepositoryList />
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 1235px;
  position: relative;

  display: flex;
  justify-content: space-between;
`;

export default HomeContainer;
