import styled from "styled-components";
import { MAIN_COLOR } from "../styled/main.styled";
import { useNavigate, NavLink } from "react-router-dom";

const TitleWrapper = styled.div`
  background-color: ${MAIN_COLOR};
  position: fixed;
  width: 100vw;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 0;
  padding-top: 10px;
  z-index: 1000;
`;

export function TitleLogo() {
  const navigate = useNavigate();

  return (
    <TitleWrapper>
      <img
        src="/svg/chevron-left.svg"
        onClick={() => navigate(-1)}
        style={{ position: "absolute", left: "24px", width: "40px" }}
      />
      <NavLink to="/">
        <img src="/svg/titlelogo.svg" />
      </NavLink>
    </TitleWrapper>
  );
}
