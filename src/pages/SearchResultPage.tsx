import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function getRandomCoordinate(offset: number) {
  // 랜덤한 값은 -offset에서 offset 사이의 값입니다.
  return (Math.random() - 0.5) * 2 * offset;
}
const { naver } = window;
const numberOfMarkers = 10;
let map: any = null;

export default function SearchResultPage() {
  const mapRef = useRef(null);

  const [myLocation, setMyLocation] = useState({
    latitude: 35.17020285491475,
    longitude: 129.1302716200882,
  });

  // 위치추적에 성공했을때 위치 값을 넣어줍니다.
  const success = useCallback((position: any) => {
    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    axios
      .get("/api/map-direction/v1/driving", {
        params: {
          start: `${position.coords.longitude},${position.coords.latitude}`,
          goal: "129.1302716200882,35.16946772596308",
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": import.meta.env.VITE_NAVER_MAP_API_KEY,
          "X-NCP-APIGW-API-KEY": import.meta.env.VITE_NAVER_MAP_API_SECRET,
        },
      })
      .then((response) => {
        if (
          typeof naver !== "undefined" &&
          "maps" in naver &&
          map !== null &&
          response.data.route.traoptimal !== undefined
        ) {
          const paths: number[][] = response.data.route.traoptimal[0].path;

          const polylinePath: any[] = [];
          paths.forEach((path) => {
            polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
          });

          new naver.maps.Polyline({
            path: polylinePath,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 5,
            map: map,
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
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
  }, [mapRef, myLocation, success, error, naver]);

  return (
    <div>
      <div ref={mapRef} style={{ minHeight: "400px", marginTop: "90px" }} />
      <Link to="/">
        <img src="/footerMap.png" alt="footerMap" />
      </Link>
    </div>
  );
}
