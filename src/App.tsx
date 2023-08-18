import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import { RankingPage } from "./pages/RankingPage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { NearbyPage } from "./pages/NearbyPage";
import { TitleLogo } from "./components/TitleLogo";

export const pageList = [
  {
    name: "주변 식당",
    path: "nearby",
    components: <NearbyPage />,
    src: "/svg/map-01.png",
  },
  {
    name: "랭킹",
    path: "ranking",
    components: <RankingPage />,
    src: "/svg/trophy-01.png",
  },
  {
    name: "프로필",
    path: "myprofile",
    components: <MyProfilePage />,
    src: "/svg/user-square.png",
  },
];

function App() {
  return (
    <>
      <NextUIProvider>
        <TitleLogo />
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search/:keyword" element={<SearchResultPage />} />
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
