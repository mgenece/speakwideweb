import FavoriteListMain from '@/components/DashboardOther/FavoriteListMain';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const FavoriteList = () => {
  return (
    <DashboardWrapper isReqSession smallPadding>
      <FavoriteListMain />
    </DashboardWrapper>
  );
};

export default FavoriteList;
