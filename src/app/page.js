import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import Timeline from "@/components/Timeline";
import TechStack from "@/components/TechStack";
import TaskMonitor from "@/components/TaskMonitor";
import Footer from "@/components/Footer";
import { getAllLogs, getLogContent } from "@/lib/markdown";

export default async function Home() {
  // Fetch and parse all weekly logs at build time
  const logs = getAllLogs();

  // Convert markdown content to HTML for each log
  const logsWithHtml = await Promise.all(
    logs.map(async (log) => {
      const htmlContent = await getLogContent(log.content);
      return {
        week: log.week,
        title: log.title,
        date: log.date,
        tags: log.tags || [],
        htmlContent,
      };
    })
  );

  return (
    <main>
      <Hero />
      <ImpactDashboard />
      <Timeline logs={logsWithHtml} />
      <TechStack />
      <TaskMonitor />
      <Footer />
    </main>
  );
}
