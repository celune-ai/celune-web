'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface WaitlistState {
  submitted: boolean;
  referralCode: string;
  setSubmitted: (v: boolean) => void;
  setReferralCode: (v: string) => void;
}

const WaitlistContext = createContext<WaitlistState>({
  submitted: false,
  referralCode: '',
  setSubmitted: () => {},
  setReferralCode: () => {},
});

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  return (
    <WaitlistContext.Provider value={{ submitted, referralCode, setSubmitted, setReferralCode }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  return useContext(WaitlistContext);
}
