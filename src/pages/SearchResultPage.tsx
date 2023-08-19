import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { TitleLogo } from "../components/TitleLogo";
import axios from "axios";

function getRandomCoordinate(offset) {
  // 랜덤한 값은 -offset에서 offset 사이의 값입니다.
  return (Math.random() - 0.5) * 2 * offset;
}

const numberOfMarkers = 10;
const start = "부산역";
const goal = "벡스코";
const waypoints = "해운대";
let map = null;

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
    console.log(position.coords.latitude, position.coords.longitude);
  }, []);

  // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
  const error = useCallback(() => {
    setMyLocation({
      latitude: 35.17020285491475,
      longitude: 129.13078766952125,
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
      axios
        .get("/api/map-direction/v1/driving", {
          params: {
            start: "129.13078766952125,35.17020285491475",
            goal: "129.1302716200882,35.16946772596308",
          },
          headers: {
            "X-NCP-APIGW-API-KEY-ID": import.meta.env.VITE_NAVER_MAP_API_KEY,
            "X-NCP-APIGW-API-KEY": import.meta.env.VITE_NAVER_MAP_API_SECRET,
          },
        })
        .then((response) => {
          if ("maps" in naver && map !== null) {
            console.log(response.data.route);
            console.log(response.data.route.traoptimal);
            const paths = response.data.route.traoptimal[0].path;

            const polylinePath = [];
            paths.forEach((path) => {
              polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
            });

            const polyline = new naver.maps.Polyline({
              path: polylinePath,
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 10,
              map: map,
            });
            console.log(polyline);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [success, error]);

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

    map = new naver.maps.Map(mapRef.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map: map,
    });

    for (let i = 0; i < numberOfMarkers; i++) {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          myLocation.latitude + getRandomCoordinate(0.01),
          myLocation.longitude + getRandomCoordinate(0.01),
        ),
        map: map,
      });
    }
    console.log(
      myLocation.latitude + getRandomCoordinate(0.01),
      myLocation.longitude + getRandomCoordinate(0.01),
    );
  }, [mapRef, myLocation, success, error, naver]);

  return (
    <>
      <TitleLogo />
      <div ref={mapRef} style={{ minHeight: "400px", marginTop: "60px" }} />
    </>
  );
}
