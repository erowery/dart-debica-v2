import { useState, useEffect, useCallback } from 'react';
import { fetchLeagueData, fetchLiveMatches, fetchLeagueStats, fetchLeagueSchedule } from '@/lib/nakkaApi';

export function useLeagueData(nakkaId: string | undefined) {
  const [leagueData, setLeagueData] = useState<any>(null);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [stats, setStats] = useState<Record<string, any> | null>(null);
  const [schedule, setSchedule] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!nakkaId) return;
    
    setLoading(true);
    setError(null);

    try {
      const [data, live, leagueStats, sched] = await Promise.all([
        fetchLeagueData(nakkaId),
        fetchLiveMatches(nakkaId),
        fetchLeagueStats(nakkaId),
        fetchLeagueSchedule(nakkaId),
      ]);

      const activeOnly = (live || []).filter((m: any) => m.endMatch !== 1 && m.endMatch !== true);
      setLeagueData(data);
      setLiveMatches(activeOnly);
      setStats(leagueStats);
      setSchedule(sched);
      setError(null);
    } catch (err) {
      console.error('[useLeagueData] Error:', err);
      setError('Nie udało się pobrać danych.');
    } finally {
      setLoading(false);
    }
  }, [nakkaId]);

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 5000);
    return () => clearInterval(intervalId);
  }, [loadData]);

  return { leagueData, liveMatches, stats, schedule, loading, error, refetch: loadData };
}
