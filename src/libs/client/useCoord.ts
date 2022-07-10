import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function useCoords() {
  const [region, set_region] = useState<string>('');
  const [session_region, set_session_region] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('region')) {
      set_session_region(sessionStorage.getItem('region') as string);
      return ;
    }
    
    let geocoder = new window.kakao.maps.services.Geocoder();
    let callback = function (result: any[], status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        set_region(result[0].region_3depth_name);
        sessionStorage.setItem('region', result[0].region_3depth_name);
      } else {
        return '당근마켓';
      }
    };

    navigator.geolocation.getCurrentPosition((position) => {
      geocoder.coord2RegionCode(position.coords.longitude, position.coords.latitude, callback);
    });
  }, []);

  return region || session_region;
}
