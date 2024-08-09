import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className='flex h-screen max-h-screen overflow-hidden'>
      {/* Sidebar with a fixed width */}
      <Sidebar className='w-64 bg-gray-800 text-white' />
      {/* Main content area */}
      <div className='flex-1 overflow-auto'>
        <MessageContainer className='h-full' />
      </div>
    </div>
  );
};

export default Home;
