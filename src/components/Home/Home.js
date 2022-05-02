import { useSelector } from "react-redux";
import { HomeContainer } from "../../containers";
import Navbar from "./../Navbar/Navbar";
import Loading from "./../Loading";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Loading />;
  }

  return (
    user && (
      <>
        <Navbar />
        <HomeContainer />
      </>
    )
  );
};

export default Home;
