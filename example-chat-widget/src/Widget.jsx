import {
    Button,
    ChatContainer, ConversationHeader,
    MainContainer,
    Message,
    MessageInput,
    MessageList
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useChat } from "./ChatProvider";

export const Widget = ({remoteName = "", messages = [], onSend}) => {
    const { hide } = useChat();
    return (
        <MainContainer>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Content userName={remoteName} />
                    <ConversationHeader.Actions>
                        <Button onClick={hide}>Hide</Button>
                    </ConversationHeader.Actions>
                </ConversationHeader>
        
                <MessageList>
                    {messages.map( message =>
                        <Message key={message._id} model={message} />
                    )}
        
                </MessageList>
        
                <MessageInput placeholder="Type message here"
                              attachButton={false}
                              onSend={onSend}
                />
            </ChatContainer>
        </MainContainer>
    );
};