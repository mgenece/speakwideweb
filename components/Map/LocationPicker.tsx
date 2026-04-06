/// <reference types="google.maps" />
import { Box, CardContent, Stack, Typography } from '@mui/material';
import { APIProvider, ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps';
import React, { useCallback, useState } from 'react';
import LocationMarker from './LocationMarker';
import PlaceSearch, { GooglePlace } from './PlaceSearch';

export interface LocationData {
  lat: number;
  lng: number;
  address: string | null;
  source: 'search' | 'drag_start' | 'drag_end' | 'error';
}

const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

const defaultCenter: google.maps.LatLngLiteral = { lat: 34.0522, lng: -118.2437 };

interface LocationPickerProps {
  onLocationChange: (data: LocationData) => void;
  height?: number | string;
  showHeader?: boolean;
  showCoordinates?: boolean;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationChange,
  height = 500,
  showHeader,
  showCoordinates,
}) => {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const [inputValue, setInputValue] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [shouldGeocode, setShouldGeocode] = useState(false); // NEW: Control geocoding

  const reportLocationChange = useCallback(
    (lat: number, lng: number, address: string | null, type: LocationData['source']) => {
      onLocationChange({ lat, lng, address, source: type });

      if (type === 'drag_end' && address) {
        setInputValue(address);
        setIsGeocoding(false);
      } else if (type === 'drag_start') {
        setIsGeocoding(true);
        setInputValue('Fetching address...');
      }
    },
    [onLocationChange]
  );

  const handlePlaceSelect = useCallback(
    (place: GooglePlace) => {
      const location = place.geometry?.location;
      if (!location) return;

      const lat = location.lat();
      const lng = location.lng();
      const newPosition: google.maps.LatLngLiteral = { lat, lng };

      setMapCenter(newPosition);
      setMarkerPosition(newPosition);
      setShouldGeocode(true); // Enable geocoding after search

      const address = place.formatted_address || place.name || '';
      setInputValue(address);

      reportLocationChange(lat, lng, address || null, 'search');
    },
    [reportLocationChange]
  );

  const handleMarkerDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;
      if (!latLng) return;

      const lat = latLng.lat();
      const lng = latLng.lng();
      const newPosition: google.maps.LatLngLiteral = { lat, lng };

      setMarkerPosition(newPosition);
      setMapCenter(newPosition);
      setShouldGeocode(true); // Enable geocoding after drag
      reportLocationChange(lat, lng, null, 'drag_start');
    },
    [reportLocationChange]
  );

  return (
    <Box
      // elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        height: height,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {showHeader && (
        <CardContent
          sx={{
            py: 1.5,
            px: 2,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            zIndex: 1,
            position: 'relative',
          }}
        >
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant='subtitle1' fontWeight={600}>
              Pick a location
            </Typography>
            {showCoordinates && (
              <Typography variant='caption' color='text.secondary' sx={{ fontFamily: 'monospace' }}>
                {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
              </Typography>
            )}
          </Stack>
        </CardContent>
      )}

      <Box sx={{ flex: 1, position: 'relative' }}>
        <APIProvider apiKey={apiKey ?? ''} libraries={['places', 'geocoding']}>
          <Map
            center={mapCenter}
            defaultZoom={12}
            gestureHandling='greedy'
            disableDefaultUI
            style={{ height: '100%', width: '100%' }}
          >
            <MapControl position={ControlPosition.TOP_CENTER}>
              <Box
                sx={{
                  mt: 2,
                  px: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    minWidth: { xs: '90%', sm: 420 },
                    maxWidth: 560,
                  }}
                >
                  <PlaceSearch
                    onPlaceSelect={handlePlaceSelect}
                    value={inputValue}
                    onChange={setInputValue}
                    isLoading={isGeocoding}
                  />
                </Box>
              </Box>
            </MapControl>

            <LocationMarker
              position={markerPosition}
              onDragEnd={handleMarkerDragEnd}
              reportLocationChange={reportLocationChange}
              shouldGeocode={shouldGeocode} // Pass the flag
            />
          </Map>
        </APIProvider>
      </Box>
    </Box>
  );
};

export default LocationPicker;
