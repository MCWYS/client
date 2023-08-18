import { useParams, NavLink } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function SearchResultPage() {
  const { keyword } = useParams();
  return (
    <>
      <h1>This is SearchResultPage.</h1>
      {keyword && <p>{keyword}</p>}
      <NavLink to="/">
        <Button>메인으로</Button>
      </NavLink>
    </>
  );
}
