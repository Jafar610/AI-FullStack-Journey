import { useState } from "react";
import { Plus, Mic, ArrowUp } from "lucide-react";
import axios from 'axios';
function ChatInput({ setMessages }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const submitHandler = async () => {
    if (!input.trim()) return;
    const question = input;

    setInput("");
    try {
        setIsLoading(true);
        const result = await axios.post('http://localhost:3000/api/chat/conversations', {question})
        
        const res = result.data;
        
        if(res.success){
            const {userConversation, assistantConversation} = res.data;
            setMessages((prev)=>[
                ...prev,
                {
                    role:userConversation.role,
                    content:userConversation.content,
                },
                {
                    role:assistantConversation.role,
                    content:assistantConversation.content,
                }
            ])
        }
    } catch (error) {
        throw error;
    }
   finally{
    setIsLoading(false);
   }

  };

  return (
    <>
      <div className="p-4 bg-transparent">
        <div className="flex items-center rounded-full bg-gray-900 px-3 py-2 gap-2 mx-40">
          <button>
            <Plus size={20} />
          </button>
          <input
            type="text"
            placeholder="Ask anything"
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e)=>e.key === 'Enter' && submitHandler()}
          />
          <button
            className="bg-blue-500 p-2 rounded-full hover:bg-blue-600"
            onClick={submitHandler}
            disabled={isLoading}
          >
            {input.trim() === "" ? <Mic size={20} /> : <ArrowUp size={20} />}
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatInput;
