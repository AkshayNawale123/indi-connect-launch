import { MessageCircle, Sparkles } from "lucide-react";
import { useChatState } from "@/hooks/useChatState";
import ChatDrawer from "./chatbot/ChatDrawer";

const ChatbotWidget = () => {
  const { state, setOpen } = useChatState();

  const handleClick = () => {
    setOpen(!state.isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      {/* Main Chatbot Button */}
      <button
        onClick={handleClick}
        className="relative group"
        aria-label="Open chat support"
      >
        {/* Notification Pulse Indicator */}
        <div className="absolute -top-1 -right-1 z-10 animate-bounce-gentle">
          <div className="relative">
            <div className="absolute inset-0 bg-secondary rounded-full animate-pulse-slow opacity-75 blur-sm" />
            <div className="relative bg-secondary rounded-full p-1.5 shadow-lg">
              <Sparkles className="w-4 h-4 text-secondary-foreground animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Glow Ring Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 animate-pulse-slow" />

        {/* Main Bot Icon Circle */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center overflow-hidden">
          {/* Bot Face Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-5 left-0 right-0 flex justify-center gap-2">
              <div className="w-2.5 h-2.5 bg-primary-foreground rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-float" />
              </div>
              <div className="w-2.5 h-2.5 bg-primary-foreground rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-float" />
              </div>
            </div>

            {/* Smile */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <div className="w-6 h-3 border-2 border-primary-foreground border-t-0 rounded-b-full" />
            </div>

            {/* Message Icon Overlay (subtle) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
        </div>
      </button>

      {/* Tooltip on Hover */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <div className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg text-sm border">
          Chat with us!
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer open={state.isOpen} onOpenChange={setOpen} />
    </div>
  );
};

export default ChatbotWidget;
