import { NavLink } from "react-router-dom";

export function MyProfilePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavLink to="/myshoes">
        <img src="/프로필 조회 화면.png" />
      </NavLink>
    </div>
  );
}
