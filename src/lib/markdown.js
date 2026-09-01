import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const logsDirectory = path.join(process.cwd(), 'content', 'logs');

export function getAllLogs() {
  const fileNames = fs.readdirSync(logsDirectory);
  
  const allLogs = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(logsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''),
        ...data,
        content,
      };
    });

  // Sort by week number (ascending)
  return allLogs.sort((a, b) => (a.week || 0) - (b.week || 0));
}

export async function getLogContent(markdownContent) {
  const processedContent = await remark().use(html).process(markdownContent);
  return processedContent.toString();
}
