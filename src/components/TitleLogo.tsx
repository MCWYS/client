import styled from "styled-components";
import { MAIN_COLOR, TEXT_COLOR } from "../styled/main.styled";

const TitleWrapper = styled.div`
  background-color: ${MAIN_COLOR};
  position: relative;
  width: 100vw;
  height: 9vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${TEXT_COLOR};
`;

export const Title = () => {
  return (
    <TitleWrapper>
      <img src="/svg/titlelogo.svg" />
    </TitleWrapper>
  );
};
