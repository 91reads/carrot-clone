import React, { useEffect, useState } from "react";

interface UseCoordState {
  longitude: number | null;
  latitude: number | null;
}

export default function useCoords() {
  const [coords, set_coords] = useState<UseCoordState>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    set_coords({ latitude, longitude })
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  });

  return coords;
}
