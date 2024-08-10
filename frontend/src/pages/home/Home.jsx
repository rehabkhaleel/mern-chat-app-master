import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col h-screen overflow-scroll min-w-[320px] max-w-[1200px] bg-sky-400">
      <div className="flex h-full overflow-auto">
        <Sidebar className="w-1/3  text-white" />
        <div className="w-2/3 overflow-y-auto flex flex-col">
          <MessageContainer className="flex-1" />
        </div>
      </div>
    </div>
  );
};

export default Home;
