// components/DashboardOther/ChatHistoryMain/SessionList.tsx
import { mediaUrl } from '@/api/endpoints';

import { useInfiniteSessionList } from '@/hooks/useInfiniteSessionList';
import { useDebounce } from '@/hooks/utils/useDebounce';
import assest from '@/json/assest';
import { calculateDuration, formatDateTime } from '@/lib/functions/_helpers.lib';
import { IInterpreterSession } from '@/typescript/interface/session.interface';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import SearchIconSmall from '@/ui/Icons/SearchIconSmall';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface SessionListProps {
  onChatSelect: (data: { id: string; vonage: string }) => void;
  isMobile?: boolean;
  selectedSessionId: string;
}

function SessionList({ onChatSelect, selectedSessionId }: SessionListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Debounce search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { sessions, fetchMoreData, hasNextPage, isLoading, isError } = useInfiniteSessionList({
    itemsPerPage: 10,
    search: debouncedSearchQuery, // Use debounced value
    listType: 'completed',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getSessionLanguages = (session: IInterpreterSession) => {
    if (session.language_one && session.language_two) {
      return `${session.language_one} ↔ ${session.language_two}`;
    }
    return session.language_one || session.language_two || 'No language specified';
  };

  useEffect(() => {
    const querySession = router.asPath?.split('?session=')?.[1];
    if (querySession) {
      if (sessions[0]?._id) {
        const vonageId =
          sessions.filter(item => item._id === querySession)?.[0]?.vonage_session_id || '';
        if (vonageId) onChatSelect({ id: querySession as string, vonage: vonageId });
      }
    } else if (sessions[0]?._id) {
      onChatSelect({ id: sessions[0]._id, vonage: sessions[0].vonage_session_id });
    }
  }, [sessions[0]?._id, router?.asPath]);

  // Show loading indicator while typing (before debounce completes)
  const isSearching = searchQuery !== debouncedSearchQuery;

  if (isLoading) {
    return (
      <Box className='left-box'>
        <Stack alignItems='center' justifyContent='center' sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className='left-box'>
        <Stack alignItems='center' justifyContent='center' sx={{ py: 4 }}>
          <Typography color='error'>Failed to load sessions</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box className='left-box'>
      <Box sx={{ position: 'relative' }}>
        <InputFieldCommon
          className='search-field'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearchChange}
          endAdornment={isSearching ? <CircularProgress size={20} /> : <SearchIconSmall />}
        />
      </Box>

      <Stack className='main-item-stack' spacing={'5px'} id='scrollableDiv'>
        {sessions.length ? (
          <InfiniteScroll
            dataLength={sessions.length}
            next={fetchMoreData}
            hasMore={!!hasNextPage}
            loader={
              <Stack alignItems='center' sx={{ py: 2 }}>
                <CircularProgress size={24} />
              </Stack>
            }
            endMessage={
              sessions.length > 0 ? (
                <Typography
                  variant='body2'
                  sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}
                >
                  No more sessions
                </Typography>
              ) : null
            }
            scrollableTarget='scrollableDiv'
            scrollThreshold={0.9}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {sessions.map(session => {
              const { day } = formatDateTime(session.start_date_time);
              const date = new Date(session.start_date_time);
              const time = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });
              const duration = calculateDuration(session.start_date_time, session.end_date_time);
              return (
                <Stack
                  direction='column'
                  spacing={1.5}
                  key={session._id}
                  onClick={() => {
                    onChatSelect({ vonage: session.vonage_session_id, id: session._id });
                  }}
                  className={
                    session.vonage_session_id === selectedSessionId
                      ? 'message-item-stack active-chat'
                      : 'message-item-stack'
                  }
                  sx={{
                    cursor: 'pointer',
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    bgcolor:
                      session.vonage_session_id === selectedSessionId
                        ? 'action.selected'
                        : 'transparent',
                    border: theme =>
                      session.vonage_session_id === selectedSessionId
                        ? `1px solid ${theme.palette.primary.main}`
                        : '1px solid transparent',
                    '&:hover': {
                      bgcolor:
                        session.vonage_session_id === selectedSessionId
                          ? 'action.selected'
                          : 'action.hover',
                      borderColor: 'divider',
                      boxShadow: theme => `0 2px 8px ${theme.palette.action.hover}`,
                    },
                  }}
                >
                  {/* Top Section: Avatar + Content */}
                  <Stack
                    direction='row'
                    alignItems='flex-start'
                    spacing={2}
                    className='messageTopSc'
                  >
                    {/* Avatar */}
                    <Box sx={{ flexShrink: 0, pt: 0.5 }} className='msgFgOutr'>
                      {
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: theme =>
                              session.vonage_session_id === selectedSessionId
                                ? `2px solid ${theme.palette.primary.main}`
                                : '2px solid transparent',
                            transition: 'border 0.2s ease',
                          }}
                          className='msgFgInnr'
                        >
                          <Image
                            src={
                              session.client_profile_image
                                ? mediaUrl(`user_profile_pic/${session.client_profile_image}`)
                                : assest.dashboardHeaderAvatarImage
                            }
                            width={48}
                            height={48}
                            alt={`client-${session.client}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                      }
                    </Box>

                    {/* Content Section */}
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                      className='msgRghtPrt'
                    >
                      {/* Session Reference */}
                      <Typography
                        variant='body2'
                        sx={{
                          fontWeight: 500,
                          color: 'text.secondary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                        className='msgId'
                      >
                        {session.session_ref_number}
                      </Typography>

                      {/* Client Name */}
                      <Typography
                        variant='body1'
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.95rem',
                          lineHeight: 1.3,
                        }}
                        title={session.client}
                        className='msgNms'
                      >
                        {session.client || 'NA'}
                      </Typography>

                      {/* Languages */}
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        className='msgTxts'
                      >
                        {getSessionLanguages(session)}
                      </Typography>
                    </Box>
                    <Box className='timingrt'>
                      <Typography variant='body1'>{time}</Typography>
                    </Box>
                  </Stack>

                  {/* Bottom Section: Date + Time/Duration */}
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{
                      pt: 0.5,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                    className='timingFrameStack'
                  >
                    {/* Day */}
                    <Typography
                      variant='caption'
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                      className='timingDayStck'
                    >
                      {day}
                    </Typography>

                    {/* Time and Duration */}
                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={0.5}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                      className='timingPrtsStck'
                    >
                      {/* <ClockIcon
                        sx={{
                          fontSize: 14,
                          color: 'primary.main',
                        }}
                      />
                      <Typography
                        variant='caption'
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {time}
                      </Typography> */}
                      <Typography
                        variant='caption'
                        sx={{
                          fontSize: '0.7rem',
                          color: 'text.secondary',
                        }}
                        className='durationTime'
                      >
                        {duration}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </InfiniteScroll>
        ) : (
          <Stack alignItems='center' spacing={1} sx={{ py: 4 }}>
            <Typography variant='body2' sx={{ textAlign: 'center', color: 'text.secondary' }}>
              {debouncedSearchQuery
                ? 'No sessions found matching your search'
                : 'No sessions found'}
            </Typography>
            {debouncedSearchQuery && (
              <Typography variant='caption' color='text.secondary'>
                Try adjusting your search terms
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default SessionList;
