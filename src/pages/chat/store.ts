import { create } from 'zustand'
import type { ChatMessage } from './types'



type ChatStates = {
  userMessage: string,
  setUserMessage: (message: string) => void,
  messages:ChatMessage[],
  submitUserMessage: () => void
}
export const useChatStore = create<ChatStates>()((set) => ({
  userMessage: '',
  messages: [],
  setUserMessage: (message: string) => set(() =>{
    console.log('Setting user message:', message);
    return { userMessage: message }}
  ),
  submitUserMessage: () => set((state) =>{
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender:'user',
      content: state.userMessage,
      timestamp: new Date()
    }
    return({ messages: [...state.messages,newMessage], userMessage:'' });
  })
}))