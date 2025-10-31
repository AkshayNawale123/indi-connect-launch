import { useState, useEffect } from 'react';
import { STORAGE_KEY, UserCategory } from '@/lib/chatConstants';

export type ConversationStage = 'name' | 'category' | 'chat' | 'contact' | 'complete';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface UserData {
  name?: string;
  category?: UserCategory;
  phone?: string;
  email?: string;
}

export interface ChatState {
  stage: ConversationStage;
  messages: ChatMessage[];
  userData: UserData;
  isOpen: boolean;
  chatStartTime?: Date;
  contactRequested: boolean;
  contactSkipped: boolean;
  escalationOffered: boolean;
}

const initialState: ChatState = {
  stage: 'name',
  messages: [],
  userData: {},
  isOpen: false,
  contactRequested: false,
  contactSkipped: false,
  escalationOffered: false,
};

export const useChatState = () => {
  const [state, setState] = useState<ChatState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    
    try {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        isOpen: false,
        messages: parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
        chatStartTime: parsed.chatStartTime ? new Date(parsed.chatStartTime) : undefined,
      };
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    const stateToSave = {
      ...state,
      isOpen: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [state]);

  const addMessage = (role: 'user' | 'assistant' | 'system', content: string) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: new Date(),
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    return newMessage.id;
  };

  const updateLastMessage = (content: string) => {
    setState(prev => {
      const messages = [...prev.messages];
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === 'assistant') {
        messages[messages.length - 1] = { ...lastMsg, content };
      }
      return { ...prev, messages };
    });
  };

  const setStage = (stage: ConversationStage) => {
    setState(prev => ({ ...prev, stage }));
  };

  const setUserData = (data: Partial<UserData>) => {
    setState(prev => ({ ...prev, userData: { ...prev.userData, ...data } }));
  };

  const setOpen = (isOpen: boolean) => {
    setState(prev => ({ ...prev, isOpen }));
  };

  const startChat = () => {
    setState(prev => ({
      ...prev,
      chatStartTime: prev.chatStartTime || new Date(),
    }));
  };

  const markContactRequested = () => {
    setState(prev => ({ ...prev, contactRequested: true }));
  };

  const markContactSkipped = () => {
    setState(prev => ({ ...prev, contactSkipped: true }));
  };

  const markEscalationOffered = () => {
    setState(prev => ({ ...prev, escalationOffered: true }));
  };

  const resetChat = () => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    state,
    addMessage,
    updateLastMessage,
    setStage,
    setUserData,
    setOpen,
    startChat,
    markContactRequested,
    markContactSkipped,
    markEscalationOffered,
    resetChat,
  };
};
