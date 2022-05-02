import styled from "styled-components/macro";
import { FiBookOpen, FiBook, FiGrid, FiStar } from "react-icons/fi";
import { BiCube } from "react-icons/bi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavbarWrapper>
      <NavbarItems>
        <NavbarItemContainer>
          <NavbarItem>
            <FiBookOpen
              style={{ marginRight: "5px", fontSize: "18px", color: "grey" }}
            />
            Overview
          </NavbarItem>
        </NavbarItemContainer>
        <NavbarItemContainer>
          <NavbarItem>
            <FiBook
              style={{ marginRight: "5px", fontSize: "18px", color: "grey" }}
            />
            Repositories <Pill>{user.public_repos}</Pill>
          </NavbarItem>
        </NavbarItemContainer>

        <NavbarItemContainer>
          <NavbarItem>
            <FiGrid
              style={{ marginRight: "5px", fontSize: "18px", color: "grey" }}
            />
            Projects
          </NavbarItem>
        </NavbarItemContainer>

        <NavbarItemContainer>
          <NavbarItem>
            <BiCube
              style={{ marginRight: "5px", fontSize: "18px", color: "grey" }}
            />
            Packages
          </NavbarItem>
        </NavbarItemContainer>

        <NavbarItemContainer>
          <NavbarItem>
            <FiStar
              style={{ marginRight: "2px", fontSize: "18px", color: "grey" }}
            />
            Stars <Pill></Pill>
          </NavbarItem>
        </NavbarItemContainer>
      </NavbarItems>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  border-bottom: 2px solid lightgray;
`;

const NavbarItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px 0 5px 0;
`;

const NavbarItemContainer = styled.div`
  border-radius: 5px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
    transition: all 0.2s ease-in-out;
  }
`;

const NavbarItem = styled.div`
  margin: 5px;
  padding: 3px 10px;
  font-size: 13px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pill = styled.span`
  margin-left: 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 15px;
  background-color: #dddada;
  padding: 5px;
`;

export default Navbar;
