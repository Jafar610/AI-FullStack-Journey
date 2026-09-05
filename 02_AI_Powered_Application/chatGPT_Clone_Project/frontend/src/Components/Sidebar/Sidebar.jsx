import {
  Image as ImageIcon,
  LayoutGrid,
  Microscope,
  FolderKanban,
  PanelLeftClose,
  MessageSquare,
  Code2,
} from "lucide-react";

import style from './sidebar.module.css'

function Sidebar() {
  return <aside className={style.sidebar}>
    <div className={style.header}>
        <div className={style.logo}>
            <div className={style.iconBtn}>
                <PanelLeftClose size={20}/>
            </div>
        </div>
        <button className={style.iconBtn}>
            <MessageSquare size={20}/>
        </button>
    </div>

    <nav className={style.nav}>
        <a href="#" className = {style.item}>
            <MessageSquare size={18}/>
            <span>New Chat</span>
        </a>

        <a href="#" className = {style.item}>
            <ImageIcon/>
            <span>Images</span>
        </a>

        <a href="#" className = {style.item}>
            <LayoutGrid/>
            <span>Apps</span>
        </a>

        <a href="#" className = {style.item}>
            <Microscope/>
            <span>Deep research</span>
        </a>

        <a href="#" className = {style.item}>
            <Code2 size={18}/>
            <span>Codex</span>
        </a>

        <a href="#" className = {style.item}>
            <FolderKanban size={18}/>
            <span>Project</span>
        </a>
    </nav>
  </aside>;
}

export default Sidebar;
