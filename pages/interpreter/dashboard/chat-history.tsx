import ChatHistoryInt from '@/components/layouts/chatHistory/interpreter/ChatHistoryInt';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';

const ChatHistory = () => {
  return (
    <DashboardWrapper pageTitle='Chat History' smallPadding isInterpreterType>
      <ChatHistoryInt />
    </DashboardWrapper>
  );
};

export default ChatHistory;
