import styled from "styled-components";

const MyShoesPageWrapper = styled.div`
  display: flex;
  background-color: black;
  width: 100vw;
  height: 100vh;
  margin-top: 90px;
  color: white;
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
