
function MessageList({message}) {
  return (
    <>
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {
                message.map((msg, index)=>(
                   <div key={index} className={`flex ${msg.role === 'user'? 'justify-end': 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.role === 'user'?'bg-blue-500' : 'bg-gray-700'}`}>
                        {msg.content}
                    </div>
                   </div>
                ))
            }
        </div>
    </>
  )
}

export default MessageList