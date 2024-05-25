import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";


const Message = (props) => {
    const {authUser}=useAuthContext();
    const {selectedConversation}=useConversation();
    const fromMe=props?.msg.senderId==authUser?._id
   const formattedTime=extractTime(props?.msg?.createdAt);

    const chatClassName=fromMe ?  'chat-end': 'chat-start';
    const profilePic=fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColor= fromMe ? 'bg-blue-500' : " bg-dark-500";
    const shakeCLass= props.msg.shouldShake? 'shake':"";


	return (
		<div className={`chat ${chatClassName}`}>
           <div className="chat-image avatar">
            <div className="w-5 rounded-full">
                <img src={profilePic} 
                alt="" />

            </div>

           </div>
           <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor} ${shakeCLass} pb-2 `}>{props.msg.message}</div>
           <div className={'chat-footer opacity-50 text-xs flex gap-1 items-center text-white'}> {formattedTime}</div>

          
		
		</div>
	);
};
export default Message;