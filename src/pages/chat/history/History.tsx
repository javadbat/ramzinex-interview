import { useChatStore } from "../store";
import { UserMessage } from "./user-message/UserMessage";
import { JBInfiniteScroll } from 'jb-infinite-scroll/react';
export function History() {
  const messages = useChatStore((s)=>s.messages);
  return (

    <div className="history w-full h-full overflow-x-visible">
      <JBInfiniteScroll isLoading={false}>
        <div slot="content" className="flex flex-col gap-4">
          {
            messages.map((message) => {
              switch (message.sender) {
                case 'user':
                  return <UserMessage key={message.id} message={message} />
                case 'bot':
                  return <div key={message.id} className='bot-message'>{message.content}</div>
                default:
                  return <div key={message.id} className='unknown-message'>Unknown message type</div>
              }
            })
          }
        </div>
      </JBInfiniteScroll >
    </div >
  )
}