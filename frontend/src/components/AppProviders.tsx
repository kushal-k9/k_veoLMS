// App-wide client providers: Google OAuth + silent auth bootstrap.
// QueryClientProvider lives in __root.tsx (it owns the router's QueryClient).
import type { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useBootstrapAuth } from "@/hooks/useAuth";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

function AuthBootstrap({ children }: { children: ReactNode }) {
  useBootstrapAuth();
  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const content = <AuthBootstrap>{children}</AuthBootstrap>;
  // Only mount the Google provider when a client id is configured.
  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {content}
      </GoogleOAuthProvider>
    );
  }
  return content;
}
