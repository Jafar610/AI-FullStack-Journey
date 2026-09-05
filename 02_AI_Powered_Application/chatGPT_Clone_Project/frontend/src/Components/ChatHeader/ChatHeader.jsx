import { ChevronDown } from "lucide-react";
import style from "./ChatHeader.module.css";
function ChatHeader() {
  return (
    <header className={style.header}>
      <div className={style.left}>
        <span>ChatGPT</span>
        <ChevronDown size={16} />
      </div>

      <div className={style.right}>
        <div className={style.avatar}>JM</div>
      </div>
    </header>
  );
}

export default ChatHeader;
