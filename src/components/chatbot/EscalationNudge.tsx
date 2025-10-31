import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, X } from 'lucide-react';
import { getPhoneLink, getWhatsAppLink } from '@/lib/chatConstants';

interface EscalationNudgeProps {
  userName: string;
  category: string;
  onDismiss: () => void;
}

const EscalationNudge = ({ userName, category, onDismiss }: EscalationNudgeProps) => {
  return (
    <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/30 animate-fade-in relative">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-background/50 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="mb-3">
        <h3 className="font-semibold">Ready to take the next step?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Speak directly with our trade specialists for personalized guidance.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => window.open(getPhoneLink(), '_self')}
          className="flex-1 gap-2"
          variant="default"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </Button>
        <Button
          onClick={() => window.open(getWhatsAppLink(userName, category), '_blank')}
          className="flex-1 gap-2"
          variant="secondary"
        >
          <MessageSquare className="w-4 h-4" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default EscalationNudge;
