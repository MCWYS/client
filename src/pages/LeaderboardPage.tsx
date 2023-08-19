import styled from "styled-components";
import { LeaderboardItem } from "../components/LeaderboardItem";
import { UserType } from "../type/user";

const LeaderboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  border: 3px solid #d9d9d9;
  height: 75vh;
  width: 90vw;
`;

const userList: UserType[] = [
  { name: "홍길동", score: 100, src: "/default_profile.jpg" },
  { name: "이순신", score: 90, src: "/default_profile.jpg" },
  { name: "강감찬", score: 80, src: "/default_profile.jpg" },
  { name: "이진재", score: 70, src: "/default_profile.jpg" },
  { name: "조승현", score: 60, src: "/default_profile.jpg" },
  { name: "이휘찬", score: 50, src: "/default_profile.jpg" },
  { name: "강감찬", score: 40, src: "/default_profile.jpg" },
  { name: "유관순", score: 30, src: "/default_profile.jpg" },
  { name: "김민석", score: 20, src: "/default_profile.jpg" },
  { name: "이순신", score: 10, src: "/default_profile.jpg" },
];

export function LeaderboardPage() {
  return (
    <div
      style={{
        marginTop: "90px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LeaderboardWrapper>
        {userList.slice(0, 10).map((user, idx) => (
          <LeaderboardItem key={idx} rank={idx + 1} user={user} />
        ))}
      </LeaderboardWrapper>
      <div
        style={{
          position: "fixed",
          bottom: "0px",
        }}
      >
        <LeaderboardItem
          rank={100}
          user={{ name: "AAA", score: 100, src: "/default_profile.jpg" }}
        />
      </div>
    </div>
  );
}
