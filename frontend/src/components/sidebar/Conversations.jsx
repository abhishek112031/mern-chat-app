import react from 'react';
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
	const {loading,conversations}=useGetConversations()


	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{/* <Conversation /> */}

			{
				conversations.map((conversation,idx)=>(
					<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIndex={idx==conversation.length-1}

					 />

				))
			}

			
			{loading ? (
                <span className="loading loading-spinner"></span>
              ) : null}
			
		</div>
	);
};
export default Conversations;