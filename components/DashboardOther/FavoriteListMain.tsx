import { mediaUrl } from '@/api/endpoints';
import { addRemoveFavouriteApi, listFavouriteApi } from '@/api/functions/other.api';
import { queryKeys } from '@/config/constants';
import assest from '@/json/assest';
import { queryClient } from '@/pages/_app';
import { FavoriteListWrap } from '@/styles/StyledComponents/FavoriteListWrap';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import SearchIconList from '@/ui/Icons/SearchIconList';
import TrashRedIcon from '@/ui/Icons/TrashRedIcon';
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const FavoriteListMain = () => {
  const listFavouriteQuery = useQuery({
    queryKey: queryKeys.listFavourite,
    queryFn: listFavouriteApi,
  });

  const addremoveFavouriteMutation = useMutation({
    mutationFn: addRemoveFavouriteApi,
    onSuccess: data => {
      toast.success(data?.message || 'Operation successful.');
      queryClient.invalidateQueries({ queryKey: queryKeys.listFavourite });
    },
  });

  const interpreterData = listFavouriteQuery.data?.data || [];
  const isLoading = listFavouriteQuery.isLoading;
  const isError = listFavouriteQuery.isError;

  return (
    <FavoriteListWrap>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        alignItems={{ md: 'center', xs: 'flex-start' }}
        justifyContent='space-between'
        className='headStackFavorite'
        flexWrap='wrap'
        gap={1}
      >
        <Typography variant='h2'>Favorite List</Typography>
        <InputFieldCommon
          placeholder='Search here...'
          startAdornment={<SearchIconList />}
          sx={{ width: { md: 'auto', xs: '100%' } }}
        />
      </Stack>

      <Box className='favoriteTableBox'>
        <Box maxHeight='550px' overflow='auto'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Interpreter Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={4} align='center' sx={{ py: 4 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && isError && (
                  <TableRow>
                    <TableCell colSpan={4} align='center' sx={{ py: 4 }}>
                      <Typography>Failed to load favorites.</Typography>
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && !isError && interpreterData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align='center' sx={{ py: 4 }}>
                      <Typography>No favorites found.</Typography>
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading &&
                  !isError &&
                  interpreterData.map(item => (
                    <TableRow key={item._id || item.interpreter_email}>
                      <TableCell>
                        <Avatar
                          src={
                            item.interpreter_pic
                              ? mediaUrl(`interpreter_profile_pic/${item.interpreter_pic}`)
                              : assest.dashboardHeaderAvatarImage
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>{item.interpreter_name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.interpreter_email}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            addremoveFavouriteMutation.mutate(item.interpreter_id);
                          }}
                        >
                          <TrashRedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </FavoriteListWrap>
  );
};

export default FavoriteListMain;
