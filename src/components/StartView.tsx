'use client';

import { StandingRow, MatchResultRow, FixtureRow } from '@/lib/standings';
import { IconWarning, IconTrophy, IconStopwatch } from '@/components/icons';
import LeaguePositionCard from '@/components/LeaguePositionCard';

function formatDate(date: Date) {
  return date.toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'long' });
}

export default function StartView({
  playerName,
  leagueName,
  myStanding,
  myRank,
  myTpid,
  myResults,
  myPendingFixtures,
  liveMatchMine,
  leagueUrl,
  onGoToLiga,
  onGoToMoje,
}: {
  playerName: string;
  leagueName: string;
  myStanding: StandingRow | null;
  myRank: number | null;
  myTpid: string;
  myResults: MatchResultRow[];
  myPendingFixtures: FixtureRow[];
  liveMatchMine: any | null;
  leagueUrl?: string;
  onGoToLiga: () => void;
  onGoToMoje: () => void;
}) {
  const lastResult = myResults.length > 0 ? myResults[myResults.length - 1] : null;

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const overdue = myPendingFixtures
    .filter((f) => f.date && f.date.getTime() < todayMidnight.getTime())
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());

  const upcoming = myPendingFixtures
    .filter((f) => f.date && f.date.getTime() >= todayMidnight.getTime())
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());
  const nextMatch = upcoming.length > 0 ? upcoming[0] : null;
  const totalFixtures = myResults.length + myPendingFixtures.length;

  const form = myResults.slice(-5);
  const wins = form.filter(r => (r.tpid1 === myTpid ? r.legs1 : r.legs2) > (r.tpid1 === myTpid ? r.legs2 : r.legs1)).length;
  const formPercent = form.length > 0 ? (wins / form.length) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Hero z avatarem */}
      <div className="relative p-5 bg-gradient-to-br from-brand/10 via-transparent to-gold/5 rounded-3xl border border-brand/20 mb-2">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-brand to-brand-dark shadow-glow flex items-center justify-center shrink-0">
            <span className="text-2xl font-extrabold text-white">
              {playerName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-extrabold text-white leading-tight">
              Cześć, {playerName}! 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">{leagueName}</p>
            {myRank && (
              <p className="text-xs text-gold font-semibold mt-2 flex items-center gap-1">
                🏆 #{myRank} w lidze
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onGoToLiga}
          className="card-premium p-4 text-left"
        >
          <IconTrophy className="w-8 h-8 text-gold mb-2" />
          <p className="font-bold text-white text-sm">Sprawdź tabelę</p>
          <p className="text-xs text-slate-400 mt-0.5">Wyniki i statystyki</p>
        </button>
        <button
          onClick={() => window.location.hash = '#trening'}
          className="card-premium p-4 text-left"
        >
          <IconStopwatch className="w-8 h-8 text-brand mb-2" />
          <p className="font-bold text-white text-sm">Rozpocznij trening</p>
          <p className="text-xs text-slate-400 mt-0.5">Piramida lub sesja</p>
        </button>
      </div>

      {/* Aktualny mecz na żywo */}
      {liveMatchMine && (
        <button
          onClick={onGoToLiga}
          className="w-full text-left relative p-4 bg-ink-800/60 border border-brand/40 rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
          <span className="relative flex items-center gap-1.5 text-[11px] bg-red-500/15 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full font-bold uppercase tracking-wide w-fit mb-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            Grasz teraz!
          </span>
          <p className="relative text-white font-semibold">Twój mecz trwa właśnie teraz - sprawdź wynik →</p>
        </button>
      )}

      {/* Zaległe mecze */}
      {overdue.length > 0 && (
        <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-2xl">
          <p className="text-xs uppercase tracking-wider text-red-400 font-bold mb-3 flex items-center gap-1.5">
            <IconWarning className="w-3.5 h-3.5" /> Zaległe mecze ({overdue.length})
          </p>
          <div className="space-y-2">
            {overdue.map((f, idx) => {
              const opponent = f.tpid1 === myTpid ? f.name2 : f.name1;
              return (
                <div key={idx} className="flex items-center justify-between text-sm bg-ink-900/40 rounded-xl px-3 py-2.5">
                  <span className="text-white font-medium truncate">vs {opponent}</span>
                  {f.date && <span className="text-sm font-semibold text-red-300 shrink-0 ml-2">{formatDate(f.date)}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Następny mecz */}
      {!liveMatchMine && nextMatch && (
        <div className="p-4 bg-ink-800/50 border border-gold/30 rounded-2xl">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Następny mecz</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-medium truncate">
              vs {nextMatch.tpid1 === myTpid ? nextMatch.name2 : nextMatch.name1}
            </span>
            {nextMatch.date && (
              <span className="text-sm font-bold text-gold shrink-0 ml-2">{formatDate(nextMatch.date)}</span>
            )}
          </div>
        </div>
      )}

      {/* Ostatni mecz */}
      {!liveMatchMine && lastResult && (() => {
        const LastMatchTag: any = lastResult.hasDetail ? 'a' : 'div';
        const linkProps = lastResult.hasDetail
          ? { href: lastResult.nakkaMatchUrl, target: '_blank', rel: 'noreferrer' }
          : {};
        return (
          <LastMatchTag
            {...linkProps}
            className="block p-4 bg-ink-800/50 border border-ink-700/60 hover:border-brand/30 rounded-2xl transition-colors"
          >
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Twój ostatni mecz</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200 font-medium truncate">{lastResult.name1}</span>
              <span className="font-bold text-white px-3 whitespace-nowrap bg-ink-700/60 rounded-lg py-0.5 mx-2">
                {lastResult.legs1} - {lastResult.legs2}
              </span>
              <span className="text-slate-200 font-medium truncate text-right">{lastResult.name2}</span>
            </div>
          </LastMatchTag>
        );
      })()}

      {!liveMatchMine && !lastResult && (
        <div className="p-4 bg-ink-800/50 border border-ink-700/60 rounded-2xl text-sm text-slate-400">
          Nie masz jeszcze rozegranych meczów w tym sezonie.
        </div>
      )}

      {/* Twoja liga */}
      <LeaguePositionCard
        leagueName={leagueName}
        myStanding={myStanding}
        myRank={myRank}
        myTpid={myTpid}
        myResults={myResults}
      />

      {/* Twoje sprawy */}
      <div className="p-4 bg-ink-800/50 border border-ink-700/60 rounded-2xl">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <IconWarning className="w-3.5 h-3.5 text-gold" /> Twoje sprawy
        </p>
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Rozegrane mecze</span>
            <span className="font-bold text-white">
              {myResults.length} / {totalFixtures}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Zaległości</span>
            {overdue.length === 0 ? (
              <span className="font-bold text-emerald-400">Brak ✓</span>
            ) : (
              <span className="font-bold text-red-400">{overdue.length}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Forma (ostatnie 5)</span>
            <span className="font-bold text-white">
              {form.length > 0 ? `${wins}W / ${form.length - wins}P` : '-'}
            </span>
          </div>
        </div>
      </div>

      {leagueUrl && (
        <a
          href={leagueUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Otwórz pełny widok ligi na Nakka ↗
        </a>
      )}
    </div>
  );
}
