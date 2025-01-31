import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    
    const [messages, setMessages] = useState([]);
    
    const sendMessage = (message) => {
        setMessages(messages.concat(message));
    }

    const hide = () => {
        // here the second parameter origin can be fixed by widget settings or * for any domain
        window.parent.postMessage("hide", "*");
    }
    
    return <ChatContext.Provider value={{
        messages,
        sendMessage,
        hide
    }}>{children}</ChatContext.Provider>
    
}

export const useChat = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error("useChatContext must be within ChatProvider");
    }

    return context;

}