import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { nameSchema } from '@/lib/chatValidation';
import MessageBubble from './MessageBubble';

interface NameCollectionStageProps {
  onSubmit: (name: string) => void;
}

const NameCollectionStage = ({ onSubmit }: NameCollectionStageProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = nameSchema.parse({ name });
      setError('');
      onSubmit(result.name);
    } catch (err: any) {
      setError(err.errors[0]?.message || 'Invalid name');
    }
  };

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant' as const,
    content: "Hello! I'm your T-imoexo assistant. What's your name?",
    timestamp: new Date(),
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageBubble message={welcomeMessage} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="mt-1"
              autoFocus
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NameCollectionStage;
