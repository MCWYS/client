const script = document.createElement("script");
script.type = "text/javascript";
script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
  import.meta.env.VITE_NAVER_MAP_API_KEY
}`;
document.body.appendChild(script);
