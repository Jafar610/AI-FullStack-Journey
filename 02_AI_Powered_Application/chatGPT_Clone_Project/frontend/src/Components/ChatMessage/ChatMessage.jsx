import {User, Bot} from 'lucide-react'
import style from './chatMessage.module.css'
import ReactMarkdown from 'react-markdown'
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

        <div className={style.content}>
            {
                role === 'user' ? (
                    content
                ) : (
                    <div className = {style.markdownBody}>
                        {
                            <ReactMarkdown>{content}</ReactMarkdown>
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ChatMessage