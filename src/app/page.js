import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Pipeline from "@/components/Pipeline";
import Slider from "@/components/Slider";
import ImpactDashboard from "@/components/ImpactDashboard";
import TechStack from "@/components/TechStack";
import TaskMonitor from "@/components/TaskMonitor";
import Footer from "@/components/Footer";
import { getAllLogs, getLogContent } from "@/lib/markdown";

/**
 * Pulls the first real paragraph out of a log for the slide face. Skips
 * headings, bullets and blockquotes, then strips the inline markdown so the
 * slide gets clean prose rather than asterisks.
 */
function excerptOf(markdown, limit = 210) {
  const block = markdown
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .find((b) => b && !/^[#>\-*|]/.test(b));

  if (!block) return "";

  const clean = block
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= limit) return clean;
  // Cut on a word boundary so the ellipsis never lands mid-word.
  return clean.slice(0, clean.lastIndexOf(" ", limit)) + "…";
}

export default async function Home() {
  const logs = getAllLogs();

  const parsed = await Promise.all(
    logs.map(async (log) => ({
      week: log.week,
      title: log.title,
      date: log.date,
      tags: log.tags || [],
      github: log.github || null,
      demo: log.demo || null,
      excerpt: excerptOf(log.content),
      htmlContent: await getLogContent(log.content),
    }))
  );

  // Newest first — the slider opens on the most recent week.
  const deck = [...parsed].reverse();

  // Counted, not typed in, so the footer's claim stays true as weeks are added.
  const repoCount = parsed.filter((l) => l.github).length;

  return (
    <main>
      <Hero />

      {/* Everything below rides over the top of the hero, which stays put
          behind it. The opaque background is what makes that read as one
          surface sliding over another rather than a gap in the page. */}
      <div className="relative z-10 bg-[var(--void)]">
        <Marquee
          duration={48}
          items={[
            "Every push rebuilds this page",
            "Ten weeks logged",
            "Reconciled to the row",
            "Zero-dependency xlsx",
            "Unattended runs",
          ]}
        />

        <Pipeline />
        <Slider logs={deck} />
        <ImpactDashboard />

        <Marquee
          reverse
          duration={54}
          items={[
            "Playwright",
            "Google Apps Script",
            "Sheets API",
            "PDF parsing",
            "Statement reconciliation",
            "Build it once, run it forever",
          ]}
        />

        <TechStack />
        <TaskMonitor />
        <Footer repoCount={repoCount} total={parsed.length} />
      </div>
    </main>
  );
}
