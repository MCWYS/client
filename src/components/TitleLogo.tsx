import styled from "styled-components";
import { MAIN_COLOR, TEXT_COLOR } from "../styled/main.styled";
import { NavLink } from "react-router-dom";

const TitleWrapper = styled.div`
  background-color: ${MAIN_COLOR};
  position: fixed;
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${TEXT_COLOR};
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
