import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { contactSchema } from '@/lib/chatValidation';
import { toast } from '@/hooks/use-toast';

interface ContactCollectionStageProps {
  onSubmit: (phone: string, email: string) => void;
  onSkip: () => void;
}

const ContactCollectionStage = ({ onSubmit, onSkip }: ContactCollectionStageProps) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = contactSchema.parse({ phone, email });
      setErrors({});
      onSubmit(result.phone, result.email);
      toast({
        title: "Thank you!",
        description: "Your contact details have been saved.",
      });
    } catch (err: any) {
      const newErrors: { phone?: string; email?: string } = {};
      err.errors.forEach((error: any) => {
        newErrors[error.path[0] as 'phone' | 'email'] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-6 bg-muted/50 rounded-lg border-2 border-primary/20 animate-fade-in">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Let's stay connected</h3>
        <p className="text-sm text-muted-foreground mt-1">
          To better assist you, may I have your contact details?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="mt-1"
          />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="mt-1"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onSkip} className="flex-1">
            Skip for now
          </Button>
          <Button type="submit" className="flex-1">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactCollectionStage;
