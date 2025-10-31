import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CATEGORY_OPTIONS, UserCategory } from '@/lib/chatConstants';
import { Building2, Globe2, ShoppingCart } from 'lucide-react';
import MessageBubble from './MessageBubble';

interface CategorySelectionStageProps {
  userName: string;
  onSubmit: (category: UserCategory) => void;
}

const categoryIcons = {
  manufacturer: Building2,
  international_buyer: ShoppingCart,
  international_seller: Globe2,
};

const CategorySelectionStage = ({ userName, onSubmit }: CategorySelectionStageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<UserCategory>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      onSubmit(selectedCategory);
    }
  };

  const greetingMessage = {
    id: 'greeting',
    role: 'assistant' as const,
    content: `Nice to meet you, ${userName}! Which best describes you?`,
    timestamp: new Date(),
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageBubble message={greetingMessage} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <RadioGroup value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as UserCategory)}>
          <div className="space-y-3">
            {CATEGORY_OPTIONS.map((option) => {
              const Icon = categoryIcons[option.value];
              return (
                <Label
                  key={option.value}
                  htmlFor={option.value}
                  className="flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent"
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                    </div>
                  </div>
                </Label>
              );
            })}
          </div>
        </RadioGroup>
        
        <Button type="submit" className="w-full mt-4" disabled={!selectedCategory}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default CategorySelectionStage;
