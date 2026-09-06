import style from './MessageList.module.css'
import ChatMessage from '../ChatMessage/ChatMessage'
function MessageList({conversations}) {
  return (
    <div className={style.messageList}>
      {
        conversations.length === 0? (
          <div className={style.empty}>What are you working on?</div>
        ): (
          conversations.map(msg=>(
            <ChatMessage key={msg.id} role = {msg.role} content = {msg.content} />
          ))
        )
      }
    </div>
  )
}

export default MessageList