import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

interface PlaceSuggestion {
  placePrediction: google.maps.places.PlacePrediction;
  text: string;
  secondaryText: string;
}

interface SuggestionListProps {
  suggestions: PlaceSuggestion[];
  onSelect: (suggestion: PlaceSuggestion) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        mt: 1,
        borderRadius: 2,
        overflow: 'hidden',
        maxHeight: 400,
      }}
    >
      <List disablePadding>
        {suggestions.map((suggestion, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => onSelect(suggestion)}
              sx={{
                py: 1.5,
                px: 2,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LocationOnIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant='body2' fontWeight={500}>
                    {suggestion.text}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                    }}
                  >
                    {suggestion.secondaryText}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SuggestionList;
