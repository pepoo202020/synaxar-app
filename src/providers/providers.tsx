"use client";

import { ThemeProvider } from "./Therme-Provider/theme-provider";

interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
