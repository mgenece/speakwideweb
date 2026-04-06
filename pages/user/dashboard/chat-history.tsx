import ChatHistoryUser from '@/components/layouts/chatHistory/user/ChatHistoryUser';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const ChatHistory = () => {
  return (
    <DashboardWrapper pageTitle='Chat History' smallPadding>
      <ChatHistoryUser />
    </DashboardWrapper>
  );
};

export default ChatHistory;
