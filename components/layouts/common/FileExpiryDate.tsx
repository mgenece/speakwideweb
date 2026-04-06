import { CommonDatePicker } from '@/styles/StyledComponents/UploadFileStyled';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FileUploadSingle from './FileUploadSingle';

// --- INTERFACES ---

interface IProps {
  onChange: (files: IFileText[]) => void;
  supportedFileText: string;
  errorText: string;
  maxFiles: number; // NEW: Optional max files limit
}

// Add a unique `id` for providing a stable key
interface IFileText {
  id: number;
  file: File | null;
  expiryDate: Dayjs | null;
}

interface IProps1 {
  setFiles: Dispatch<SetStateAction<IFileText[]>>;
  supportedFileText: string;
  handelViewMore: () => void;
  isLast: boolean;
  index: number;
  item: IFileText;
  filesLength: number; // Pass array length to handle removal logic
  maxFiles: number; // NEW: Pass maxFiles to child
}

// --- CHILD COMPONENT ---

const FileDateInput = ({
  setFiles,
  supportedFileText,
  handelViewMore,
  isLast,
  index,
  item,
  filesLength,
  maxFiles, // NEW: Receive maxFiles prop
}: IProps1) => {
  const isFileAdded = !!item.file;
  const isMaxFilesReached = maxFiles ? filesLength >= maxFiles : false; // NEW: Check if max files reached

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Correctly update the file for the current item using its index
      setFiles(prev =>
        prev.map((currentItem, i) => (i === index ? { ...currentItem, file: file } : currentItem))
      );
    } else if (filesLength > 1) {
      // Handle file removal when there are multiple files
      setFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      // Handle file removal when it is the last remaining file
      setFiles(prev =>
        prev.map((currentItem, i) =>
          i === index ? { ...currentItem, file: null, expiryDate: null } : currentItem
        )
      );
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFiles(prev =>
      prev.map((currentItem, i) =>
        i === index ? { ...currentItem, expiryDate: date } : currentItem
      )
    );
  };
  const theme = useTheme();

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <FileUploadSingle
        supportedFileText={supportedFileText}
        accept='image/png, image/jpeg, image/jpg, application/pdf'
        onChange={handleFileChange}
        error={''}
      />
      <CommonDatePicker
        label='Expiry Date (Optional)'
        value={item.expiryDate}
        onChange={handleDateChange}
        disabled={!isFileAdded}
        views={['year', 'month', 'day']}
        format='DD-MM-YYYY'
      />
      {/* UPDATED: Hide "Add More" button when max files reached */}
      {isLast && !isMaxFilesReached && (
        <Button
          disabled={!isFileAdded}
          onClick={handelViewMore}
          component='label'
          variant='text'
          sx={{
            textTransform: 'none',
            padding: '0',
            justifyContent: 'initial',
            transition: 'all .3s ease',
            color: theme.palette.text.primary,
            maxWidth: 'max-content',
            '&:hover': {
              bgcolor: 'transparent',
              color: theme.palette.primary.main,
            },
          }}
        >
          <Typography variant='caption'>+ Add More</Typography>
        </Button>
      )}
    </Stack>
  );
};

// --- PARENT COMPONENT ---

export default function FileExpiryDate({
  supportedFileText,
  onChange,
  errorText,
  maxFiles, // NEW: Accept maxFiles prop
}: IProps) {
  const [files, setFiles] = useState<IFileText[]>([
    { id: Date.now(), file: null, expiryDate: null },
  ]);

  // Notify the parent component when the list of valid files changes
  useEffect(() => {
    const validFiles = files.filter(f => f.file !== null);
    onChange(validFiles);
  }, [files]);

  const handleAddMore = () => {
    // NEW: Prevent adding more files if max limit is reached
    if (maxFiles && files.length >= maxFiles) {
      return;
    }

    // Add a new item with a unique ID (using timestamp for simplicity)
    setFiles(prev => [...prev, { id: Date.now(), file: null, expiryDate: null }]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack>
        {files.map((item, index) => (
          <FileDateInput
            key={item.id} // FIX: Use the stable, unique ID as the key
            item={item}
            index={index}
            setFiles={setFiles}
            supportedFileText={supportedFileText}
            handelViewMore={handleAddMore}
            isLast={index === files.length - 1}
            filesLength={files.length} // Pass length down for removal logic
            maxFiles={maxFiles} // NEW: Pass maxFiles to child
          />
        ))}
      </Stack>
      <p style={{ color: 'red', fontSize: '14px', marginInlineStart: '14px' }}>{errorText}</p>
    </LocalizationProvider>
  );
}
