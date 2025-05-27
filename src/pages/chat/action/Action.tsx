import {JBTextarea} from 'jb-textarea/react'
import { JBButton } from 'jb-button/react'
import { useChatStore } from '../store'
import type { JBTextareaEventType, JBTextareaWebComponent } from 'jb-textarea';
function Action() {

  const userMessage = useChatStore((store)=>store.userMessage);
  const setUserMessage = useChatStore((store)=>store.setUserMessage);
  const submitUserMessage = useChatStore((store)=>store.submitUserMessage);
  
  const onEnter = (e:JBTextareaEventType<KeyboardEvent>)=>{
    if(!e.shiftKey){
      e.preventDefault();
      setUserMessage(e.target.value);
      submitUserMessage();
    }
  }
  return (
    <div>
      <JBTextarea
        value={userMessage}
        onInput={(e)=>setUserMessage((e.target as JBTextareaWebComponent).value)}
        onEnter={onEnter}
        placeholder='لطفا پاسخ خود را وارد کنید'
        autoHeight>
        <JBButton variant='ghost' slot="inline-end-section" onClick={()=>submitUserMessage()}>ارسال</JBButton>
      </JBTextarea>
    </div>
  )
}

export default Action