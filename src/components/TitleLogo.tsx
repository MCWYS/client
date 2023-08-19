import styled from "styled-components";
import { MAIN_COLOR } from "../styled/main.styled";
import { NavLink } from "react-router-dom";

const TitleWrapper = styled.div`
  background-color: ${MAIN_COLOR};
  position: fixed;
  width: 100vw;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  padding-top: 10px;
`;

export function TitleLogo() {
  return (
    <TitleWrapper>
      <NavLink to="/">
        <img src="/svg/titlelogo.svg" />
      </NavLink>
    </TitleWrapper>
  );
}
