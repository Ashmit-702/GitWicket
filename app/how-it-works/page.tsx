export const dynamic = "force-static";

export default function HowItWorksPage() {
  return (
    <main className="mow-lines min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="font-display text-xs uppercase tracking-widest text-bail">
          ← GitWicket
        </a>

        <h1 className="mt-6 font-display text-3xl font-black uppercase italic text-chalk">How it's rated</h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-chalk/70">
          Every card is generated from your public GitHub activity — nothing manual, nothing subjective.
          Here's exactly what feeds each stat.
        </p>

        <div className="mt-8 space-y-6">
          {[
            {
              stat: "Strike rate (STR)",
              copy: "Recent commit volume, last 12 months. More commits, higher strike rate — like a batsman scoring quickly.",
            },
            {
              stat: "Batting average (AVG)",
              copy: "Commits, merged pull requests, and reviews, averaged across your active years — years you actually contributed, not just years the account has existed. A dormant old account isn't penalized for calendar time it wasn't active.",
            },
            {
              stat: "Wickets (WKT)",
              copy: "Merged pull requests plus code reviews given. Shipped work counts, not just opened PRs.",
            },
            {
              stat: "Economy (ECO)",
              copy: "Stars and followers, scaled logarithmically. Lower economy (like real cricket) means tighter, more efficient impact per repo.",
            },
            {
              stat: "Boundaries (BND)",
              copy: "Total stars across your owned, non-fork repos.",
            },
            {
              stat: "Catches (CAT)",
              copy: "Code reviews given in the last 12 months — helping other people's work land safely.",
            },
          ].map((row) => (
            <div key={row.stat} className="border-l-2 border-bail/40 pl-4">
              <p className="font-display text-sm font-bold uppercase tracking-wide text-bail">{row.stat}</p>
              <p className="mt-1 font-body text-sm text-chalk/60">{row.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-chalk/10 pt-6">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-bail">Overall rating</p>
          <p className="mt-2 font-body text-sm leading-relaxed text-chalk/60">
            A weighted blend of all six stats, capped at 88. The 90s ("Legend" tier) are a separate gate — earned
            only with at least 4 active years, 4 account-years, 400+ followers, and 800+ stars. One heroic year
            can't buy it; it takes sustained years and real influence.
          </p>
        </div>

        <div className="mt-10 border-t border-chalk/10 pt-6">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-bail">Tiers</p>
          <ul className="mt-2 space-y-1 font-body text-sm text-chalk/60">
            <li>Bronze — below 65</li>
            <li>Silver — 65 to 79</li>
            <li>Gold — 80 to 89</li>
            <li>Legend — 90+ (gated, see above)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
