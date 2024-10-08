import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col h-screen overflow-scroll min-w-[320px] max-w-[1200px] bg-white shadow-slate-500 border-4 text-black">
      <Header />
      <div className="flex h-full overflow-auto flex-grow">
        <Sidebar className="w-1/3 text-black" />
        <div className="w-2/3 overflow-y-auto flex flex-col">
          <MessageContainer className="flex-1 text-black" />
        </div>
      </div>
      <footer className="flex justify-center items-center w-full py-4 bg-gray-200 text-black">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
