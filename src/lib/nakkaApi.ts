const NAKKA_BASE_URL = 'https://push.n01darts.com/api/v1';

async function fetchWithTimeout(url: string, ms = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);

  const separator = url.includes('?') ? '&' : '?';
  const freshUrl = `${url}${separator}_t=${Date.now()}`;

  try {
    const response = await fetch(freshUrl, {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(id);
    
    if (!response.ok) {
      console.error(`[API] ${response.status} ${response.statusText}`, url);
    }
    
    return response;
  } catch (error) {
    clearTimeout(id);
    console.error(`[API] Network error:`, error, url);
    return null;
  }
}

async function fetchWithRetry(url: string, retries = 2, timeout = 6000) {
  for (let i = 0; i < retries + 1; i++) {
    const res = await fetchWithTimeout(url, timeout);
    if (res && res.ok) return res;
    
    if (i < retries) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return null;
}

export async function fetchLeagueData(tdid: string) {
  try {
    const res = await fetchWithRetry(`${NAKKA_BASE_URL}/tournament/get?tdid=${tdid}`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    if (!data || data.result !== 0) return null;
    return data;
  } catch (error) {
    console.error('[API] fetchLeagueData error:', error);
    return null;
  }
}

export async function fetchLiveMatches(tdid: string) {
  try {
    const res = await fetchWithTimeout(`${NAKKA_BASE_URL}/match/list?tdid=${tdid}&live=1`, 6000);
    if (!res || !res.ok) return [];
    const data = await res.json();
    if (!data || data.result !== 0) return [];
    return data.list || [];
  } catch (error) {
    console.error('[API] fetchLiveMatches error:', error);
    return [];
  }
}

export async function fetchLeagueStats(tdid: string): Promise<Record<string, any> | null> {
  try {
    const res = await fetchWithTimeout(`${NAKKA_BASE_URL}/tournament/stats?tdid=${tdid}&kind=stats_list`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    if (!data || data.result !== 0) return null;
    return data.stats || null;
  } catch (error) {
    console.error('[API] fetchLeagueStats error:', error);
    return null;
  }
}

export async function fetchLeagueSchedule(tdid: string): Promise<any[] | null> {
  try {
    const res = await fetchWithTimeout(`${NAKKA_BASE_URL}/league/schedule/get?tdid=${tdid}`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    if (!data || data.result !== 0) return null;
    return data.schedule || null;
  } catch (error) {
    console.error('[API] fetchLeagueSchedule error:', error);
    return null;
  }
}
