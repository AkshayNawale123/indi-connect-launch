import { useEffect, useRef, useState } from 'react';
import { CONTACT_PROMPT_DELAY, ESCALATION_PROMPT_DELAY } from '@/lib/chatConstants';

export const useChatTimers = (
  chatStartTime: Date | undefined,
  isActive: boolean
) => {
  const [shouldRequestContact, setShouldRequestContact] = useState(false);
  const [shouldShowEscalation, setShouldShowEscalation] = useState(false);
  
  const contactTimerRef = useRef<NodeJS.Timeout>();
  const escalationTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isActive || !chatStartTime) {
      if (contactTimerRef.current) clearTimeout(contactTimerRef.current);
      if (escalationTimerRef.current) clearTimeout(escalationTimerRef.current);
      return;
    }

    const elapsed = Date.now() - chatStartTime.getTime();
    
    if (!shouldRequestContact && elapsed < CONTACT_PROMPT_DELAY) {
      contactTimerRef.current = setTimeout(() => {
        setShouldRequestContact(true);
      }, CONTACT_PROMPT_DELAY - elapsed);
    }

    if (!shouldShowEscalation && elapsed < ESCALATION_PROMPT_DELAY) {
      escalationTimerRef.current = setTimeout(() => {
        setShouldShowEscalation(true);
      }, ESCALATION_PROMPT_DELAY - elapsed);
    }

    return () => {
      if (contactTimerRef.current) clearTimeout(contactTimerRef.current);
      if (escalationTimerRef.current) clearTimeout(escalationTimerRef.current);
    };
  }, [chatStartTime, isActive, shouldRequestContact, shouldShowEscalation]);

  const resetTimers = () => {
    setShouldRequestContact(false);
    setShouldShowEscalation(false);
  };

  return {
    shouldRequestContact,
    shouldShowEscalation,
    resetTimers,
  };
};
