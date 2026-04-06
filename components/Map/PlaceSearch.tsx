import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  Divider,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';

export interface GooglePlace {
  formatted_address?: string;
  name?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

interface PlaceSearchProps {
  onPlaceSelect: (place: GooglePlace) => void;
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

interface PlaceSuggestion {
  placePrediction: google.maps.places.PlacePrediction;
  text: string;
  secondaryText: string;
}

const PlaceSearch: React.FC<PlaceSearchProps> = ({
  onPlaceSelect,
  value,
  onChange,
  isLoading = false,
}) => {
  const places = useMapsLibrary('places');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false); // NEW: Track if user is typing
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    if (!places) return;
    sessionTokenRef.current = new places.AutocompleteSessionToken();
  }, [places]);

  useEffect(() => {
    // Only fetch suggestions if user is actively typing
    if (!places || !value || value.length < 3 || !isUserTyping) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsFetching(true);
      try {
        const request: google.maps.places.AutocompleteRequest = {
          input: value,
          sessionToken: sessionTokenRef.current || undefined,
        };

        const { suggestions: fetchedSuggestions } =
          await places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        const formattedSuggestions: PlaceSuggestion[] = fetchedSuggestions
          .filter(suggestion => suggestion.placePrediction !== null)
          .map(suggestion => ({
            placePrediction: suggestion.placePrediction!,
            text: suggestion.placePrediction!.mainText?.text || '',
            secondaryText: suggestion.placePrediction!.secondaryText?.text || '',
          }));

        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsFetching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, places, isUserTyping]); // Added isUserTyping dependency

  const handleSuggestionClick = async (suggestion: PlaceSuggestion) => {
    try {
      const { place } = await suggestion.placePrediction.toPlace().fetchFields({
        fields: ['location', 'formattedAddress', 'displayName'],
      });

      if (place.location) {
        const googlePlace: GooglePlace = {
          formatted_address: place.formattedAddress || undefined,
          name: place.displayName || undefined,
          geometry: {
            location: {
              lat: () => place.location!.lat(),
              lng: () => place.location!.lng(),
            },
          },
        };

        onPlaceSelect(googlePlace);
        setShowSuggestions(false);
        setIsUserTyping(false); // Reset typing state

        if (places) {
          sessionTokenRef.current = new places.AutocompleteSessionToken();
        }
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const handleInputChange = (newValue: string) => {
    setIsUserTyping(true); // Mark as user typing
    onChange(newValue);
    if (!newValue) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsUserTyping(false);
    }
  };

  // Reset typing state when value changes externally (from marker drag)
  useEffect(() => {
    // If loading state is active, it means marker was dragged
    if (isLoading) {
      setIsUserTyping(false);
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [isLoading]);

  return (
    <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
      <Box ref={anchorRef}>
        <Box
          // elevation={4}
          sx={{
            p: 0.5,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <InputBase
              inputRef={inputRef}
              placeholder='Search for a location...'
              fullWidth
              value={value}
              onChange={e => handleInputChange(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0 && isUserTyping) {
                  setShowSuggestions(true);
                }
              }}
              disabled={isLoading}
              sx={{
                px: 1.5,
                py: 0.75,
                fontSize: 14,
              }}
              startAdornment={
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                  {isLoading || isFetching ? (
                    <CircularProgress size={18} thickness={4} />
                  ) : (
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  )}
                </Box>
              }
            />
          </Box>
        </Box>

        {/* Sleek & Compact MUI Suggestions Dropdown */}
        <Popper
          open={showSuggestions && suggestions.length > 0}
          anchorEl={anchorRef.current}
          placement='bottom-start'
          style={{ width: anchorRef.current?.offsetWidth, zIndex: 1300 }}
        >
          <Paper
            elevation={8}
            sx={{
              mt: 0.5,
              borderRadius: 2,
              overflow: 'hidden',
              maxHeight: 350,
              overflowY: 'auto',
              backgroundColor: 'background.paper',
              border: theme => `1px solid ${theme.palette.divider}`,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '3px',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                },
              },
            }}
          >
            <List disablePadding dense>
              {suggestions.map((suggestion, index) => (
                <Box key={index}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleSuggestionClick(suggestion)}
                      dense
                      sx={{
                        py: 1,
                        px: 1.5,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          '& .MuiListItemIcon-root': {
                            color: 'primary.main',
                            transform: 'scale(1.1)',
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32, transition: 'all 0.2s ease' }}>
                        <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant='body2'
                            fontWeight={500}
                            sx={{
                              fontSize: '0.875rem',
                              lineHeight: 1.4,
                              color: 'text.primary',
                            }}
                          >
                            {suggestion.text}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant='caption'
                            sx={{
                              fontSize: '0.75rem',
                              color: 'text.secondary',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'block',
                              mt: 0.25,
                            }}
                          >
                            {suggestion.secondaryText}
                          </Typography>
                        }
                        sx={{ my: 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < suggestions.length - 1 && (
                    <Divider
                      sx={{
                        mx: 1.5,
                        borderColor: 'divider',
                        opacity: 0.6,
                      }}
                    />
                  )}
                </Box>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default PlaceSearch;
