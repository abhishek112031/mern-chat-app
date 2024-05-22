import React,{useState,useEffect} from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading,setloading] = useState(false);
    const {messages,setMessages,selectedConversation}=useConversation();

    useEffect(()=>{
      const getMessages=async()=>{
        setloading(true);
        try {
          const res=await fetch(`/api/messages/get-messages/${selectedConversation._id}`);
          const data=await res.json();
          if(data.error) throw new Error(data.error);

          console.log('data:=========== ', data);

          setMessages(data);

          setloading(false);
        } catch (error) {
         toast.error(error.message)
        }finally{
            setloading(false)
        }
      }
     if(selectedConversation?._id) getMessages();

    },[selectedConversation?._id,setMessages])


    return {messages,loading}

}

export default useGetMessages
