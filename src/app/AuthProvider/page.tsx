"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// --- Types ---
export type UserRole = "DOCTOR" | "PATIENT" | "NURSE" | "DEFAULT";

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  // Simple state for non-blocking error messages (to replace alert())
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

// --- Context and Hook ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// --- Provider Component ---
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState<UserRole>("DEFAULT");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isAuthenticated = role !== "DEFAULT";

  // Initial state check (runs only once on app load/hydration)
  useEffect(() => {
    // 1. Check localStorage first
    // Ensures persistent state is loaded when the app first renders.
    const storedRole =
      (localStorage.getItem("role")?.toUpperCase() as UserRole) || null;

    if (storedRole && ["DOCTOR", "PATIENT", "NURSE"].includes(storedRole)) {
      setRole(storedRole);
    }
  }, []);

  const contextValue: AuthContextType = {
    role,
    setRole,
    isAuthenticated,
    errorMessage,
    setErrorMessage,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {/* Simple Global Error Modal (Displays error message instead of alert()) */}
      {errorMessage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setErrorMessage(null)} // Dismiss on backdrop click
        >
          <div
            className="p-6 bg-red-800/90 rounded-xl shadow-2xl max-w-sm border border-red-500/50"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3 className="text-xl font-bold text-white mb-2">Error</h3>
            <p className="text-red-100 mb-4">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="w-full py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
