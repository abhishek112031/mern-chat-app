import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import nofificationSound from '../assets/sounds/mixkit-sci-fi-confirmation-914.wav'

const useListenMessages = () => {
    const {socket}=useSocketContext();
    const {messages,setMessages}=useConversation();
    useEffect(()=>{
       
        socket?.on("newMessage",(newMessage)=>{
            
            newMessage.shouldShake=true;
            const sound= new Audio(nofificationSound);
            sound.play();
            setMessages([...messages,newMessage])
           
        })

        return ()=>socket.off("newMessage")
    },[socket,messages,setMessages]);
 
}

export default useListenMessages


