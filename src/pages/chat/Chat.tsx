import Action from './action/Action';
import './chat.css';
import {History} from './history/History';

export default function Chat() {
  return (
    <div id="Chat">
      <div className="chat-layout">
        <div className="header">header</div>
        <div className="chat-history"><History/></div>
        <div className="side-bar">side</div>
        <div className="chat-actions"><Action/></div>
      </div>
    </div>
  )
}
