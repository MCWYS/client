import { Input } from "@nextui-org/react";
import { NavBar } from "../components/NavBar";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const foodList = [
  { name: "한식" },
  { name: "중식" },
  { name: "일식" },
  { name: "양식" },
  { name: "인도식" },
  { name: "미국식" },
  { name: "커피" },
  { name: "야식" },
  { name: "디저트" },
];

export default function MainPage() {
  const [distance, setDistance] = useState(50);
  const [keyword, setKeyword] = useState("");

  const handleDistanceChange = (e) => {
    const newDistance = e.target.value;
    setDistance(newDistance);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <Input
            style={{ width: "50vw" }}
            placeholder="식당 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <NavLink to={`/search/${keyword}`}>
            <img src="/svg/search-sm.svg" />
          </NavLink>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            margin: "30px",
          }}
        >
          {foodList.map((food) => (
            <div
              key={food.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#D9D9D9",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                }}
              ></div>
              <h2 style={{}}>{food.name}</h2>
            </div>
          ))}
        </div>
        <div>
          <input
            type="range"
            id="cowbell"
            name="cowbell"
            style={{ width: "300px" }}
            min="0"
            max="100"
            value={distance}
            step="10"
            onChange={handleDistanceChange}
          />
        </div>
        <label>내 위치로부터 {distance / 5} 분 거리까지</label>
        <NavBar />
      </div>
    </>
  );
}
