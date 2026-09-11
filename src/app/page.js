import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import Timeline from "@/components/Timeline";
import CodeHighlights from "@/components/CodeHighlights";
import TechStack from "@/components/TechStack";
import TaskMonitor from "@/components/TaskMonitor";
import Footer from "@/components/Footer";
import { getAllLogs, getLogContent } from "@/lib/markdown";

export default async function Home() {
  const logs = getAllLogs();

  const logsWithHtml = await Promise.all(
    logs.map(async (log) => {
      const htmlContent = await getLogContent(log.content);
      return {
        week: log.week,
        title: log.title,
        date: log.date,
        tags: log.tags || [],
        github: log.github || null,
        demo: log.demo || null,
        htmlContent,
      };
    })
  );

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ImpactDashboard />
        <Timeline logs={logsWithHtml} />
        <CodeHighlights />
        <TechStack />
        <TaskMonitor />
        <Footer />
      </main>
    </>
  );
}
