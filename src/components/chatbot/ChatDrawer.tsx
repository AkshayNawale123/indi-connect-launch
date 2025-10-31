import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { useChatState } from "@/hooks/useChatState";
import { useChatTimers } from "@/hooks/useChatTimers";
import { useEffect } from "react";
import NameCollectionStage from "./NameCollectionStage";
import CategorySelectionStage from "./CategorySelectionStage";
import ChatConversationStage from "./ChatConversationStage";
import ContactCollectionStage from "./ContactCollectionStage";
import EscalationNudge from "./EscalationNudge";

interface ChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatDrawer = ({ open, onOpenChange }: ChatDrawerProps) => {
  const {
    state,
    addMessage,
    updateLastMessage,
    setStage,
    setUserData,
    startChat,
    markContactRequested,
    markEscalationOffered,
  } = useChatState();

  const { shouldRequestContact, shouldShowEscalation } = useChatTimers(
    state.chatStartTime,
    state.stage === 'chat'
  );

  useEffect(() => {
    if (shouldRequestContact && !state.contactRequested && state.stage === 'chat') {
      addMessage('system', 'Contact information requested (see form below)');
      markContactRequested();
    }
  }, [shouldRequestContact, state.contactRequested, state.stage]);

  useEffect(() => {
    if (shouldShowEscalation && !state.escalationOffered && state.stage === 'chat') {
      addMessage('system', 'Our team is ready to assist you personally');
      markEscalationOffered();
    }
  }, [shouldShowEscalation, state.escalationOffered, state.stage]);

  const handleNameSubmit = (name: string) => {
    setUserData({ name });
    addMessage('user', name);
    setStage('category');
  };

  const handleCategorySubmit = (category: string) => {
    setUserData({ category: category as any });
    addMessage('user', category.replace('_', ' '));
    addMessage('assistant', `Great! Feel free to ask me anything about international trade processes, documentation, or how T-imoexo can help you succeed.`);
    setStage('chat');
    startChat();
  };

  const handleNewMessage = (content: string) => {
    return addMessage(content ? 'assistant' : 'user', content || '');
  };

  const handleContactSubmit = (phone: string, email: string) => {
    setUserData({ phone, email });
    addMessage('system', 'Thank you for providing your contact details!');
  };

  const handleContactSkip = () => {
    addMessage('system', 'No problem! You can provide your details anytime.');
  };

  const handleEscalationDismiss = () => {
    // Just dismiss - the system message is already added
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] max-h-[700px]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>T-imoexo Trade Assistant</DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2 hover:bg-accent rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {state.stage === 'name' && (
            <NameCollectionStage onSubmit={handleNameSubmit} />
          )}

          {state.stage === 'category' && state.userData.name && (
            <CategorySelectionStage
              userName={state.userData.name}
              onSubmit={handleCategorySubmit}
            />
          )}

          {state.stage === 'chat' && state.userData.name && state.userData.category && (
            <div className="flex flex-col h-full">
              <ChatConversationStage
                messages={state.messages}
                userName={state.userData.name}
                category={state.userData.category}
                onNewMessage={handleNewMessage}
                onUpdateMessage={updateLastMessage}
              />
              
              {/* Contact Form Overlay */}
              {state.contactRequested && !state.userData.email && (
                <div className="p-4 border-t bg-background">
                  <ContactCollectionStage
                    onSubmit={handleContactSubmit}
                    onSkip={handleContactSkip}
                  />
                </div>
              )}

              {/* Escalation Nudge */}
              {state.escalationOffered && state.userData.email && (
                <div className="p-4 border-t bg-background">
                  <EscalationNudge
                    userName={state.userData.name}
                    category={state.userData.category}
                    onDismiss={handleEscalationDismiss}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;
