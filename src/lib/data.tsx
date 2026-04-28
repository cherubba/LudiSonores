import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Bando, EventItem } from '@/types';
import { fetchPublishedEvents } from './firestore-events';
import { fetchAllBandi } from './firestore-bandi';

interface DataState {
  events: EventItem[];
  bandi: Bando[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const DataContext = createContext<DataState | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [bandi, setBandi] = useState<Bando[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([fetchPublishedEvents(), fetchAllBandi()])
      .then(([ev, bd]) => {
        if (cancelled) return;
        setEvents(ev);
        setBandi(bd);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const value: DataState = {
    events,
    bandi,
    loading,
    error,
    refetch: () => setTick((t) => t + 1),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataState {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
