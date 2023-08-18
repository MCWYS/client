import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <>
      <NextUIProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search/:keyword" element={<SearchResultPage />} />
            <Route path="/*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </>
  );
}

export default App;
