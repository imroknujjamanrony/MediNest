"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

type ProvidersProps = {
  children: React.ReactNode;
} & SessionProviderProps;

export function Providers({ children, ...props }: ProvidersProps) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
