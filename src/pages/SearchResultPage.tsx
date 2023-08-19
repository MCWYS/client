import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

export default function SearchResultPage() {
  const { keyword } = useParams();
  const mapRef = useRef(null);
  const { naver } = window;

  const [myLocation, setMyLocation] = useState({});

  // 위치추적에 성공했을때 위치 값을 넣어줍니다.
  const success = useCallback((position) => {
    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, []);

  // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
  const error = useCallback(() => {
    console.log("위치 추적 실패");
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [success, error, navigator.geolocation]);

  useEffect(() => {
    if (!mapRef.current || !naver) return;

    const location = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude,
    );

    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
    };

    const map = new naver.maps.Map(mapRef.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [mapRef, myLocation, success, error, naver]);

  return (
    <>
      <h1>This is SearchResultPage.</h1>
      {keyword && <p>{keyword}</p>}
      <div ref={mapRef} style={{ minHeight: "400px" }} />
    </>
  );
}
