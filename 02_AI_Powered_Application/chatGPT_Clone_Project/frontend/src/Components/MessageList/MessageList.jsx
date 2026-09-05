import style from './MessageList.module.css'

function MessageList({conversations}) {
  return (
    <div>
      {
        conversations.length === 0? (
          <div>What are you working on?</div>
        ): (
          conversations.map(msg=>(
            <h1>{msg.content}</h1>
          ))
        )
      }
    </div>
  )
}

export default MessageList