import {User, Bot} from 'lucide-react'
import style from './chatMessage.module.css'
function ChatMessage({role, content}) {
  return (
    <div className={`${style.message} ${style[role]}`}>
        <div className={`${style.avatar} ${style[role]}`}>
            {
                role === 'user' ? (
                    <User size={18} color='white'/>
                ) : (
                    <Bot size={18} color='white'/>
                )
            }
        </div>
    </div>
  )
}

export default ChatMessage