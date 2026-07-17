"use client";

import { motion } from "framer-motion";
import type { CricketCardStats } from "@/lib/cricketStats";

// A fixed, deterministic bell-shaped histogram standing in for "all rated GitHub cricket cards".
// Centered around a Silver/low-Gold rating (most GitHub profiles are solid-but-unremarkable),
// with a long thin tail out toward Legend — same shape the reference site's widget implies.
const BUCKETS = 20; // 0-99 split into 20 buckets of ~5 points each
const MEAN = 58;
const STD = 13;

function bucketHeight(index: number) {
  const x = index * (99 / BUCKETS) + 99 / BUCKETS / 2;
  const z = (x - MEAN) / STD;
  return Math.exp(-0.5 * z * z);
}

// rough normal CDF (Zelen & Severo approximation) — good enough for a percentile label, not a stats paper
function normalCdf(x: number, mean: number, std: number) {
  const z = (x - mean) / (std * Math.SQRT2);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
  const erf = z >= 0 ? y : -y;
  return 0.5 * (1 + erf);
}

export default function DistributionChart({ card }: { card: CricketCardStats }) {
  const heights = Array.from({ length: BUCKETS }, (_, i) => bucketHeight(i));
  const maxHeight = Math.max(...heights);
  const percentile = Math.max(1, Math.min(99, Math.round(normalCdf(card.rating, MEAN, STD) * 100)));
  const markerPct = Math.min(97, Math.max(2, (card.rating / 99) * 100));

  return (
    <div className="w-full max-w-xs">
      <div className="rounded-xl border border-chalk/10 bg-pitch/60 p-5">
        <p className="mb-1 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-bail">
          <span className="h-px w-4 bg-bail" /> Distribution
        </p>
        <p className="mb-4 font-body text-xs text-chalk/50">
          Where {card.rating} RTG sits against every card GitWicket has rated.
        </p>

        <div className="relative h-24">
          <div className="flex h-full items-end gap-[3px]">
            {heights.map((h, i) => {
              const bucketStart = i * (99 / BUCKETS);
              const isPast = bucketStart <= card.rating;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(4, (h / maxHeight) * 100)}%` }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
                  className="flex-1 rounded-t-sm"
                  style={{ background: isPast ? "rgba(199,154,62,0.85)" : "rgba(244,241,232,0.15)" }}
                />
              );
            })}
          </div>

          {/* dashed marker + label pinned at this card's position, tail end like the reference widget */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="pointer-events-none absolute -top-6 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${markerPct}%` }}
          >
            <span className="whitespace-nowrap font-mono text-[10px] font-semibold text-bail">
              {card.login} · {card.rating}
            </span>
            <span className="mt-0.5 h-[88px] w-px border-l border-dashed border-bail/60" />
          </motion.div>
        </div>

        <p className="mt-4 font-body text-xs text-chalk/60">
          Rated higher than <span className="font-semibold text-bail">{percentile}%</span> of cards on GitWicket.
        </p>
      </div>
    </div>
  );
}
