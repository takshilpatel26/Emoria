import { createContext, useState, useContext, ReactNode } from "react";

interface LoaderContextType {
  loaderComplete: boolean;
  setLoaderComplete: (complete: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <LoaderContext.Provider value={{ loaderComplete, setLoaderComplete }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
}
