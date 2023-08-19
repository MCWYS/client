import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { NearbyPage } from "./pages/NearbyPage";
import { StorePage } from "./pages/StorePage";
import { TitleLogo } from "./components/TitleLogo";
import { MyShoesPage } from "./pages/MyShoesPage";
import OrderCheckPage from "./pages/OrderCheckPage";

export const pageList = [
  {
    name: "주변 식당",
    path: "nearby",
    components: <NearbyPage />,
    src: "/svg/map-01.png",
  },
  {
    name: "리더보드",
    path: "leaderboard",
    components: <LeaderboardPage />,
    src: "/svg/trophy-01.png",
  },
  {
    name: "프로필",
    path: "myprofile",
    components: <MyProfilePage />,
    src: "/svg/user-square.png",
  },
  {
    name: "식당",
    path: "store",
    components: <StorePage />,
    src: "",
  },
  {
    name: "결제 확인",
    path: "orderCheck",
    components: <OrderCheckPage />,
    src: "",
  },
];

function App() {
  return (
    <>
      <NextUIProvider>
        <BrowserRouter basename="/">
          <TitleLogo />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search/:keyword" element={<SearchResultPage />} />
            <Route path="/myshoes" element={<MyShoesPage />} />
            {pageList.map((item, idx) => (
              <Route
                path={`/${item.path}`}
                key={idx}
                element={item.components}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </>
  );
}

export default App;
