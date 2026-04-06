import { Marker, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useMemo, useState } from 'react';
import { LocationData } from './LocationPicker';

interface LocationMarkerProps {
  position: google.maps.LatLngLiteral;
  onDragEnd: (event: google.maps.MapMouseEvent) => void;
  reportLocationChange: (
    lat: number,
    lng: number,
    address: string | null,
    type: LocationData['source']
  ) => void;
  shouldGeocode?: boolean; // NEW: Only geocode when true
}

const LocationMarker: React.FC<LocationMarkerProps> = ({
  position,
  onDragEnd,
  reportLocationChange,
  shouldGeocode = false, // Default false
}) => {
  const geocodingLib = useMapsLibrary('geocoding');

  const geocoder = useMemo(
    () => (geocodingLib ? new geocodingLib.Geocoder() : null),
    [geocodingLib]
  );

  const [address, setAddress] = useState('Drag marker to select location');
  const [isDragging, setIsDragging] = useState(false);

  const markerPosition = useMemo(() => position, [position]);

  useEffect(() => {
    // Only run geocoding if shouldGeocode is true
    if (!geocoder || !markerPosition || !shouldGeocode) return;

    geocoder.geocode({ location: markerPosition }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const newAddress = results[0].formatted_address;
        setAddress(newAddress);
        reportLocationChange(markerPosition.lat, markerPosition.lng, newAddress, 'drag_end');
      } else {
        const errorMessage = 'Address not found';
        setAddress(errorMessage);
        reportLocationChange(markerPosition.lat, markerPosition.lng, errorMessage, 'error');
      }
    });
  }, [geocoder, markerPosition.lat, markerPosition.lng, reportLocationChange, shouldGeocode]);

  return (
    <Marker
      position={markerPosition}
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={e => {
        setIsDragging(false);
        onDragEnd(e);
      }}
      title={address}
      animation={isDragging ? undefined : google.maps.Animation.DROP}
    />
  );
};

export default LocationMarker;
