import { UserType } from "../type/user";

export function LeaderboardItem({
  rank,
  user,
}: {
  rank: number;
  user: UserType;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          width: "70vw",
          height: "80px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "20px" }}>{rank}위</div>
        <img
          src={user.src}
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "14px",
          }}
        />

        <div
          style={{
            width: "50vw",
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
          }}
        >
          {user.name}
        </div>
      </div>
    </>
  );
}
