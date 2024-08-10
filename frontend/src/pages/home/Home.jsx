import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
  <div className="flex-1 flex overflow-scroll">
    <Sidebar className="w-64 bg-gray-800 text-white sm:w-56 md:w-48 lg:w-64 xl:w-72" />
    <div className="flex-1 overflow-auto min-w-0 sm:min-w-[calc(100%-56px)] md:min-w-[calc(100%-48px)] lg:min-w-[calc(100%-64px)] xl:min-w-[calc(100%-72px)]">
      <MessageContainer className="h-full" />
    </div>
  </div>
</div>
  );
};

export default Home;
