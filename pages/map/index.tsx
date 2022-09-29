import React from 'react';
import LocationMap from '@src/components/map/location-map';
import MapNavigator from '@src/components/map/map-navigator';

function Map() {
  return (
    <div>
      <MapNavigator />
      <LocationMap />
    </div>
  );
}

export default Map;
