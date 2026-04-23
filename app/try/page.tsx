"use client";

import { useState } from "react";
import Link from "next/link";

interface Result {
  score: number;
  tip: string;
}

const TIPS: { threshold: number; tip: string }[] = [
  { threshold: 30, tip: "Your recovery is low. Skip the intense workout today — a walk or light yoga will serve you better. Prioritize getting to bed 30 minutes earlier tonight." },
  { threshold: 50, tip: "Moderate recovery. You can train, but keep it at 70% intensity. Try a 20-minute nap before 2pm to top up — and no screens in the last hour before bed." },
  { threshold: 70, tip: "Solid recovery. You're on track — keep your caffeine cutoff where it is. A consistent wind-down routine tonight will lock in the gains." },
  { threshold: 90, tip: "Great recovery. Your sleep hygiene is paying off. Push hard today if you want — your body can handle it. Keep doing what you did last night." },
  { threshold: 101, tip: "Exceptional recovery. Everything is dialed in. Ride the momentum — this is what peak consistency looks like." },
];

function mockRecoveryScore(hoursSlept: number, quality: number, caffeineCutoff: string): Result {
  // Simple deterministic mock: weighted formula clamped to 0-100
  const hoursFactor = Math.min(hoursSlept, 9) / 9; // 0-1, caps at 9h
  const qualityFactor = quality / 10;

  const cutoffHour = parseInt(caffeineCutoff.split(":")[0], 10);
  // Earlier cutoff = better. Noon (12) is ideal, midnight-ish (23) is worst.
  const caffeineFactor = cutoffHour <= 12 ? 1 : Math.max(0, 1 - (cutoffHour - 12) / 11);

  const raw = hoursFactor * 40 + qualityFactor * 35 + caffeineFactor * 25;
  const score = Math.round(Math.min(100, Math.max(0, raw)));

  const tip = TIPS.find((t) => score < t.threshold)?.tip ?? TIPS[TIPS.length - 1].tip;

  return { score, tip };
}

export default function TryPage() {
  const [hoursSlept, setHoursSlept] = useState("");
  const [quality, setQuality] = useState("");
  const [caffeineCutoff, setCaffeineCutoff] = useState("14:00");
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hours = parseFloat(hoursSlept);
    const q = parseInt(quality, 10);
    if (isNaN(hours) || isNaN(q) || hours < 0 || hours > 24 || q < 1 || q > 10) return;
    setResult(mockRecoveryScore(hours, q, caffeineCutoff));
  }

  function handleReset() {
    setHoursSlept("");
    setQuality("");
    setCaffeineCutoff("14:00");
    setResult(null);
  }

  function scoreColor(score: number) {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  }

  function scoreRingColor(score: number) {
    if (score >= 70) return "#22c55e";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-fuchsia-500" />
          RestWise
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">
            Quick check-in
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            How did you sleep? Get your recovery score.
          </h1>
        </div>

        {result ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm text-center">
            <div className="relative mx-auto w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#f0f0f0" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke={scoreRingColor(result.score)}
                  strokeWidth="10"
                  strokeDasharray="326"
                  strokeDashoffset={326 - (326 * result.score) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-4xl font-bold ${scoreColor(result.score)}`}>
                  {result.score}
                </div>
                <div className="text-xs text-neutral-500">Recovery</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-fuchsia-50 p-4 text-left text-sm text-fuchsia-900">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider">
                Your tip
              </div>
              <p className="leading-relaxed">{result.tip}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Try again
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                Get early access
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-neutral-700">
                  Hours slept
                </label>
                <input
                  id="hours"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  required
                  placeholder="e.g. 7.5"
                  value={hoursSlept}
                  onChange={(e) => setHoursSlept(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label htmlFor="quality" className="block text-sm font-medium text-neutral-700">
                  Sleep quality (1&ndash;10)
                </label>
                <input
                  id="quality"
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  required
                  placeholder="e.g. 7"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label htmlFor="caffeine" className="block text-sm font-medium text-neutral-700">
                  Last caffeine intake
                </label>
                <input
                  id="caffeine"
                  type="time"
                  required
                  value={caffeineCutoff}
                  onChange={(e) => setCaffeineCutoff(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Get my recovery score
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with a mocked recovery model.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the real AI-powered experience.
        </p>
      </div>
    </div>
  );
}
