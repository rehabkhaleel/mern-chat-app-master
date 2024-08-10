import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col h-full w-1/3 text-white'>
      {/* Container for Search Input and Logout Button */}
      <div className='flex flex-col flex-grow '>
        <SearchInput className='mb-4 w-2/3' /> {/* Margin-bottom to add space below the search input */}
        <div className='divider my-4'></div> {/* Divider with vertical margin */}
        <div className='flex-1 overflow-auto'>
          <Conversations /> {/* Take up remaining space */}
        </div>
      </div>
      <LogoutButton className='mt-auto' /> {/* Push to bottom */}
    </div>
  );
};

export default Sidebar;
