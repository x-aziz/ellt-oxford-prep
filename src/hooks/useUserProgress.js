import { useMemo } from 'react';
import { useAttempts } from './useAttempt.js';

/**
 * Derives dashboard-friendly progress stats from the raw attempts list:
 * overall accuracy, best score per mock, and count per kind.
 */
export function useUserProgress() {
  const { attempts, loading } = useAttempts();

  const stats = useMemo(() => {
    const byKind = { reading: [], listening: [], writing: [] };
    attempts.forEach((a) => {
      if (byKind[a.kind]) byKind[a.kind].push(a);
    });

    const bestByMock = {};
    attempts.forEach((a) => {
      const key = `${a.kind}-${a.refId}`;
      if (!bestByMock[key] || a.pct > bestByMock[key].pct) bestByMock[key] = a;
    });

    const totalAttempts = attempts.length;
    const avgPct = totalAttempts
      ? Math.round(attempts.reduce((s, a) => s + (a.pct || 0), 0) / totalAttempts)
      : 0;

    return {
      totalAttempts,
      avgPct,
      readingCount: byKind.reading.length,
      listeningCount: byKind.listening.length,
      writingCount: byKind.writing.length,
      bestByMock,
      recent: attempts.slice(0, 5),
    };
  }, [attempts]);

  return { ...stats, loading };
}
