const historyFormatter = (messages)=>{
    return messages.map((msg)=>({
        role : msg.role === 'assistant'? 'model' : 'user',
        parts : [{text : msg.content}],
    }));
}

export default historyFormatter;