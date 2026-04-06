import { inviteActionApi, inviteShareListApi, inviteUsersApi } from '@/api/functions/invitation';
import { queryKeys } from '@/config/constants';
import { useUserData } from '@/hooks/react-query/useVisitor';
import { queryClient } from '@/pages/_app';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ButtonCommon from '../../common/ButtonCommon';

interface IFormData {
  email: string;
}

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
});

function EmailForm({
  existingEmail,
  id,
  subscriptionId,
}: {
  existingEmail?: string;
  id?: string;
  subscriptionId: string;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: existingEmail || '',
    },
  });

  const emailInviteMutation = useMutation({
    mutationFn: inviteUsersApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitationList });
      toast.success('An invitation mail with invitation link has been sent.');
    },
  });

  const removeEmailMutation = useMutation({
    mutationFn: inviteActionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitationList });
      toast.success('User invitation revoked successfully.');
      reset();
    },
    onError: () => {
      toast.error('Failed to remove user. Please try again.');
      reset();
    },
  });

  const onSubmit = async (data: IFormData) => {
    emailInviteMutation.mutate({ email: data.email, subscriptionId });
  };

  return (
    <Box>
      <Stack
        direction={'row'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Stack>
              <TextField
                {...field}
                type='email'
                placeholder='Enter email address'
                error={!!errors.email}
                disabled={isSubmitting || Boolean(id)}
                fullWidth
                variant='outlined'
              />
              {errors.email?.message && (
                <Typography sx={{ color: '#FF2828 !important' }}>
                  {errors.email?.message}
                </Typography>
              )}
            </Stack>
          )}
        />

        {id ? (
          <ButtonCommon
            variant='outlined'
            color='error'
            onClick={() =>
              removeEmailMutation.mutate({
                status: 'revoked',
                shearingId: id,
              })
            }
            isLoading={removeEmailMutation.isPending}
            disabled={removeEmailMutation.isPending}
            sx={{ mt: 0.5, minWidth: 100 }}
          >
            Revoke
          </ButtonCommon>
        ) : (
          <ButtonCommon
            type='submit'
            variant='contained'
            isLoading={emailInviteMutation.isPending}
            disabled={!isValid || isSubmitting}
            sx={{ mt: 0.5, minWidth: 100 }}
          >
            Invite
          </ButtonCommon>
        )}
      </Stack>
    </Box>
  );
}

const InvitationForm = ({ slotNumber }: { slotNumber: number }) => {
  const listInvitedUser = useQuery({
    queryKey: queryKeys.invitationList,
    queryFn: inviteShareListApi,
  });

  const { userData } = useUserData();

  const subscriptionId = userData?.subscriptionDetails?.subscriptionId || '';

  // Memoize the invitation slots to avoid recalculation
  const invitationSlots = useMemo(() => {
    const data = listInvitedUser.data?.data;
    if (slotNumber <= 1) {
      return [];
    }

    const sharedWith = data || [];

    // Create array with proper keys using user IDs or index for empty slots
    return Array.from({ length: slotNumber }, (_, index) => {
      const user = sharedWith[index];
      return {
        key: user?._id || `empty-${index}`,
        email: user?.toUserMailId,
        id: user?._id,
      };
    });
  }, [listInvitedUser.data?.data, slotNumber]);

  if (invitationSlots.length === 0) {
    return null;
  }

  return (
    <Stack gap={1} pb={4}>
      <Typography variant='h4'>Invite Users</Typography>
      {invitationSlots.map(slot => (
        <EmailForm
          key={slot.key}
          existingEmail={slot.email}
          id={slot.id}
          subscriptionId={subscriptionId}
        />
      ))}
    </Stack>
  );
};

export default InvitationForm;
