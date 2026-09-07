import {useState} from 'react'
import { Plus, Mic, ArrowUp } from 'lucide-react'
function ChatInput({messages, setMessages}) {
    const [input, setInput] = useState("");

    const submitHandler =()=>{
       if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const botMessage = {
      role: "assistant",
      content: "This is a fake response 🤖",
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
    console.log(input);

    }

  return (
    <>
        <div className='p-4 bg-transparent'>
            <div className='flex items-center rounded-full bg-gray-900 px-3 py-2 gap-2 mx-40'>

                <button>
                    <Plus size={20}/>
                </button>
                <input type="text" placeholder='Ask anything' className='flex-1 outline-none bg-transparent placeholder-gray-400' value={input}  onChange={(e) => setInput(e.target.value)} />
                <button className='bg-blue-500 p-2 rounded-full hover:bg-blue-600' onClick={submitHandler}>
                    <ArrowUp size={20}/>
                </button >
            </div>
        </div>
    </>
  )
}

export default ChatInput