import { Suspense } from "react";
import { connection } from "next/server";
import { Link } from "@/components/astryx/Link";
import { VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { ProjectCard } from "@/components/project-card";
import { formatProjectMonth, projectMonths, projectPreviews } from "@/lib/project-catalog";

async function CurrentProjects() {
  await connection();
  const { current } = projectMonths(new Date());

  return (
    <>
      <Text as="p" color="secondary">{formatProjectMonth(current)} · 10 placeholder projects</Text>
      <div className="hackboard-project-grid">
        {projectPreviews(current).map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <VStack as="main" className="hackboard-shell hackboard-showcase" gap={6}>
      <VStack gap={3} hAlign="start">
        <Link href="/">Showcase</Link>
        <Heading level={1} type="display-1">This month’s projects</Heading>
      </VStack>
      <Suspense fallback={<Text color="secondary">Loading projects…</Text>}>
        <CurrentProjects />
      </Suspense>
    </VStack>
  );
}
