"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { NewPolaroid, Polaroid } from "@/lib/types";

const STORAGE_KEY = "neverforget:polaroids";

interface PolaroidContextValue {
  polaroids: Polaroid[];
  loaded: boolean;
  addPolaroid: (polaroid: NewPolaroid) => Polaroid;
  removePolaroid: (id: string) => void;
}

const PolaroidContext = createContext<PolaroidContextValue | null>(null);

function readFromStorage(): Polaroid[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function PolaroidProvider({ children }: { children: React.ReactNode }) {
  const [polaroids, setPolaroids] = useState<Polaroid[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPolaroids(readFromStorage());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(polaroids));
  }, [polaroids, loaded]);

  const addPolaroid = useCallback((polaroid: NewPolaroid) => {
    const created: Polaroid = {
      ...polaroid,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setPolaroids((prev) => [created, ...prev]);
    return created;
  }, []);

  const removePolaroid = useCallback((id: string) => {
    setPolaroids((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <PolaroidContext.Provider
      value={{ polaroids, loaded, addPolaroid, removePolaroid }}
    >
      {children}
    </PolaroidContext.Provider>
  );
}

export function usePolaroids() {
  const ctx = useContext(PolaroidContext);
  if (!ctx) {
    throw new Error("usePolaroids must be used within a PolaroidProvider");
  }
  return ctx;
}
