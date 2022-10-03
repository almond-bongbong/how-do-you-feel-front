export const getCurrentUserLocation = (): Promise<GeolocationCoordinates> =>
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  });

export const watchUserLocation = (callback: (position: GeolocationCoordinates) => void): void => {
  navigator.geolocation.watchPosition(
    (position) => {
      callback(position.coords);
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
    },
  );
};
