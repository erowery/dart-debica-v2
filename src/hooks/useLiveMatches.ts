import { useState, useEffect, useCallback } from 'react';
import { fetchLiveMatches } from '@/lib/nakkaApi';
import { LEAGUES_CONFIG } from '@/config/leagues';

export function useAllLiveMatches(enabled: boolean) {
  const [allLiveMatches, setAllLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllLive = useCallback(async () => {
    if (!enabled || document.visibilityState === 'hidden') return;
    
    setLoading(true);
    const results = await Promise.all(
      LEAGUES_CONFIG.map(async (league) => {
        const live = await fetchLiveMatches(league.nakkaId);
        const activeOnly = (live || []).filter((m: any) => m.endMatch !== 1 && m.endMatch !== true);
        return activeOnly.map((m: any) => ({
          ...m,
          _leagueName: league.name,
          _leagueNakkaId: league.nakkaId,
        }));
      })
    );
    setAllLiveMatches(results.flat());
    setLoading(false);
  }, [enabled]);

  useEffect(() => {
    loadAllLive();
    const intervalId = setInterval(loadAllLive, 5000);
    return () => clearInterval(intervalId);
  }, [loadAllLive]);

  return { allLiveMatches, loading, refetch: loadAllLive };
}
