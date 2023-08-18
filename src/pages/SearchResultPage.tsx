import { useParams, NavLink } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useEffect, useRef } from "react";

export default function SearchResultPage() {
  const { keyword } = useParams();

  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return (
    <>
      <h1>This is SearchResultPage.</h1>
      {keyword && <p>{keyword}</p>}
      <NavLink to="/">
        <Button>메인으로</Button>
      </NavLink>
      <div ref={mapElement} style={{ minHeight: "400px" }} />
    </>
  );
}
