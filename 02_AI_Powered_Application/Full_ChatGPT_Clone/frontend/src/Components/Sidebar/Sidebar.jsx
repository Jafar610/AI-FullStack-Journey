import {
  PanelLeftClose,
  Search,
  SquarePen,
  Images,
  LibraryBig,
  CodeXml,
  FolderClosed,
  PanelLeftOpen,
} from "lucide-react";

function Sidebar({isOpen, toggleSidebar}) {
  return (
    <>
      <div className={`bg-gray-900 flex flex-col pl-2 ${isOpen ? 'w-64':'w-16'}`}>
        <div className="w-full flex justify-between items-center my-4 ">
          <div className="px-2">
            {
                isOpen &&  <h1 className="text-xl font-bold">ChatGPT</h1>
            }
          </div>

          <div className="flex justify-center items-center gap-6 pr-4">
            {
                isOpen && <Search size={18} />
            }
            <button onClick={toggleSidebar}>
                {isOpen ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            
          </div>
        </div>

       {
        isOpen ? (
             <div className="pl-2 py-2">
          <div className="flex items-center gap-2 pb-3">
            <SquarePen size={20}/>
            <span>New Chat</span>
          </div>
          <div className="flex items-center gap-2 pb-3">
            <Images size={20}/>
            <span>Images</span>
          </div>
          <div className="flex items-center gap-2 pb-3">
            <LibraryBig size={20}/>
            <span>Library</span>
          </div>
          <div className="flex items-center gap-2 pb-3">
            <CodeXml size={20}/>
            <span>Codex</span>
          </div>
          <div className="flex items-center gap-2 pb-3">
            <FolderClosed size={20}/>
            <span>Projects</span>
          </div>
        </div>
        ) : (
            <div className="hidden"></div>
        )
       }
      </div>
    </>
  );
}

export default Sidebar;
