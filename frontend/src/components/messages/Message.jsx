

const Message = (props) => {
	return (
		<div className="chat chat-end">
           <div className="chat-image avatar">
            <div className="w-5 rounded-full">
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ621JlOQ1RCRVoEoJ1sJftRtbn7NFk9Z8gtg&usqp=CAU"} 
                alt="" />

            </div>

           </div>
           <div className={'chat-bubble text-white bg-blue-500 '}>{props.msg}</div>
           <div className={'chat-footer opacity-50 text-xs flex gap-1 items-center text-slate-950'}> 12:42</div>

          
		
		</div>
	);
};
export default Message;