import styled from "styled-components";

const MyShoesPageWrapper = styled.div`
  display: flex;
  background-color: black;
  width: 100vw;
  height: 100vh;
`;

export function MyShoesPage() {
  return (
    <>
      <MyShoesPageWrapper>
        <h2>This is MyShoesPage.</h2>
      </MyShoesPageWrapper>
    </>
  );
}
