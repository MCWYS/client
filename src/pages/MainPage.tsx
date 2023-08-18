import { NavLink } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function MainPage() {
  return (
    <>
      <h1>This is MainPage.</h1>
      <NavLink to="/search/123">
        <Button>검색하기</Button>
      </NavLink>
    </>
  );
}
