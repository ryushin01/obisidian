import { useState, useEffect } from "react";
import { toastState } from "@stores";
import { useSetAtom } from "jotai";

interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  address?: string;
  error?: { code: number; message: string };
}

const useGeoLocation = () => {
  const callToast = useSetAtom(toastState);
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  // Kakao API를 사용하여 좌표를 주소로 변환하는 함수
  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;
    const headers = {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();

      if (response.status === 200 && data.documents.length > 0) {
        if (data.documents[0].road_address) {
          return data.documents[0].road_address.address_name;
        } else {
          return data.documents[0].address?.address_name;
        }
      } else {
        return "주소를 찾을 수 없습니다.";
      }
    } catch (error) {
      console.error("Geocoding API 호출 오류:", error);
      return "주소를 확인할 수 없습니다.";
    }
  };

  // 좌표를 받아 주소를 변환하고 상태를 업데이트하는 함수
  const updateLocation = async (latitude: number, longitude: number) => {
    const coordinates = { lat: latitude, lng: longitude };

    // 좌표를 사용하여 주소를 가져옴
    const address = await getAddressFromCoordinates(latitude, longitude);

    // 상태 업데이트
    setLocation({
      loaded: true,
      coordinates,
      address,
    });
  };

  // 플러터로부터 받은 위치 데이터를 처리하는 함수
  const handleLocationData = (locationData: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitude, longitude } = locationData;
    console.log("플러터에서 받은 좌표:", latitude, longitude);
    updateLocation(latitude, longitude);
  };

  useEffect(() => {
    // 브라우저의 geolocation을 사용하지 않는 경우 처리
    if (!("geolocation" in navigator)) {
      // 플러터에서 좌표 데이터를 받아 처리하는 함수 설정
      window.receiveLocationData = function (locationData: {
        latitude: number;
        longitude: number;
      }) {
        handleLocationData(locationData);
        localStorage.setItem("isLocationLoaded", "true");
      };
      return;
    }

    // 브라우저의 geolocation API로 위치를 가져오는 로직
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocation(latitude, longitude);
        localStorage.setItem("isLocationLoaded", "true");
      },
      (error) => {
        setLocation({
          loaded: true,
          error: {
            code: error.code,
            message: error.message,
          },
        });
      }
    );
  }, []);

  return location;
};

export default useGeoLocation;
