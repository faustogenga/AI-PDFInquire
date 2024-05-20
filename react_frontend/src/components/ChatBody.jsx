import { useEffect, useRef, useState } from "react";
import { Avatar, MessageList } from "react-chat-elements";
import Query from "./Query";
import { sendQuery } from "../services/api";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const SendMessages = (newMessages) => { 
    handleMessage(newMessages);
    try {
      const response = sendQuery(newMessages.text);
      response.then((data) => {
        handleMessage({
          position: 'left',
          type: 'text',
          title: 'Chatbot',
          text: data.response,
          titleColor: 'green',
          avatar: 'https://media.licdn.com/dms/image/C4E0BAQFMKH2vPjYBrQ/company-logo_200_200/0/1668504139212/aiplanet_logo?e=2147483647&v=beta&t=4s_YCgdTK3ms2AOZITKzRkO88X0qHkqJ0iOpyY32r14',
        });
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }


  const clearMessages = () => { setMessages([])};

  return (
    <>
      <div className="mx-5 mt-4" style={{ height: "65vh", overflowY: "auto" }} ref={messageListRef}>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={messages}
        />
      </div>
      <Query SendMessages={SendMessages} clearMessages={clearMessages}/>
    </>

  )
}

export default ChatBody;