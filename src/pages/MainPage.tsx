import { Input } from "@nextui-org/react";
import { Title } from "../components/TitleLogo";

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
  return (
    <>
      <Title />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginTop: "30px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <Input style={{ width: "50vw" }} placeholder="식당 검색" />
          <img src="/svg/search-sm.svg" />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            margin: "30px",
          }}
        >
          {foodList.map((food, idx) => (
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
                  width: "90px",
                  height: "90px",
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
            value="50"
            step="10"
          />
        </div>
        <label for="cowbell">내 위치로부터 __ 분 거리까지</label>
      </div>
    </>
  );
}
