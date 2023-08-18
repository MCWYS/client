import styled from "styled-components";
import { MAIN_COLOR, TEXT_COLOR } from "../styled/main.styled";
import { pageList } from "../App";
import { NavLink } from "react-router-dom";

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  width: 70vw;
  height: 70px;
  background-color: ${MAIN_COLOR};
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: ${TEXT_COLOR};
`;

export function NavBar() {
  return (
    <NavBarWrapper>
      {pageList.map((item, idx) => (
        <NavLink
          to={`${item.path}`}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={`${item.src}`} />
          <div key={idx}>{item.name}</div>
        </NavLink>
      ))}
    </NavBarWrapper>
  );
}
