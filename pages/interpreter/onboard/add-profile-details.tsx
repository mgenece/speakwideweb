import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import AddProfileDetailsForm from '@/components/layouts/authentication/interpreter/AddProfileDetailsForm';

function AddProfileDetails() {
  return (
    <AuthWrapper
      headerRight
      headingSpan='Add '
      mainHeding='Profile Details'
      subText='Add your personal details to get better users'
    >
      <AddProfileDetailsForm />
    </AuthWrapper>
  );
}

export default AddProfileDetails;
