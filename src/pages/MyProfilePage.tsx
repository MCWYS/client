import { NavLink } from "react-router-dom";

export function MyProfilePage() {
  return (
    <>
      <img src="/프로필 조회 화면.png" />
      <NavLink to="/myshoes">
        <div
          style={{
            position: "fixed",
            top: "40%",
            left: "30%",
            width: "40vw",
            height: "30px",
            zIndex: 100,
          }}
        />
      </NavLink>
    </>
  );
}
