import style from './MessageList.module.css'
import ChatMessage from '../ChatMessage/ChatMessage'
import {Bot} from 'lucide-react'
function MessageList({lastMessageRef, isLoading, conversations}) {
  return (
    <div className={style.message}>
      {
        conversations.length === 0? (
          <div className={style.empty}>What are you working on?</div>
        ): (
          conversations.map(msg=>(
            <ChatMessage key={msg.id} role = {msg.role} content = {msg.content} />
          ))
        )
      }

      {
        isLoading && (
          <div className={style.loadingContainer}>
            <div className={style.loadingAvatar}>
                <Bot size={18} color = 'white'/>
            </div>

            <div className={style.loading}>
              <div className={style.loadingDot}></div>
              <div className={style.loadingDot}></div>
              <div className={style.loadingDot}></div>
            </div>
          </div>
        )
      }
      <div ref={lastMessageRef}></div>
    </div>
  )
}

export default MessageList