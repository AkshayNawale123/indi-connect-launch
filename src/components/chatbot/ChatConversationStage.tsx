import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useChatAI } from '@/hooks/useChatAI';
import MessageBubble from './MessageBubble';
import { ChatMessage } from '@/hooks/useChatState';
import { Loader2 } from 'lucide-react';

interface ChatConversationStageProps {
  messages: ChatMessage[];
  userName: string;
  category: string;
  onNewMessage: (content: string) => string;
  onUpdateMessage: (content: string) => void;
}

const ChatConversationStage = ({
  messages,
  userName,
  category,
  onNewMessage,
  onUpdateMessage,
}: ChatConversationStageProps) => {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChatAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    onNewMessage(userMessage);

    const conversationMessages: { role: 'user' | 'assistant'; content: string }[] = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    conversationMessages.push({
      role: 'user',
      content: userMessage,
    });

    let assistantMessageStarted = false;
    let accumulatedContent = '';

    await sendMessage({
      messages: conversationMessages,
      category,
      userName,
      onDelta: (chunk) => {
        if (!assistantMessageStarted) {
          onNewMessage('');
          assistantMessageStarted = true;
        }
        accumulatedContent += chunk;
        onUpdateMessage(accumulatedContent);
      },
      onDone: () => {
        scrollToBottom();
      },
    });

    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about international trade..."
            className="min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="shrink-0 h-[60px] w-[60px]"
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatConversationStage;
