export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LatestLocation extends Coordinates {
  zoom: number;
}
