import { Suspense } from "react";
import { connection } from "next/server";
import { Button } from "@/components/astryx/Button";
import { Icon } from "@/components/astryx/Icon";
import { HStack, VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { RecentActivity } from "@/components/community-lists";
import { ProjectCard } from "@/components/project-card";
import { formatProjectMonth, projectMonths, projectPreviews } from "@/lib/project-catalog";

function ProjectRow({ id, title, month, href }: { id: string; title: string; month: string; href: string }) {
  const projects = projectPreviews(month);

  return (
    <VStack as="section" gap={4} aria-labelledby={id}>
      <HStack gap={3} hAlign="between" vAlign="center" wrap="wrap">
        <VStack gap={1}>
          <Heading id={id} level={2} type="display-3">{title}</Heading>
          <Text type="supporting" color="secondary">{formatProjectMonth(month)}</Text>
        </VStack>
        <Button label="View all" aria-label={`View all projects for ${formatProjectMonth(month)}`} href={href} variant="secondary"
          endContent={<Icon icon="chevronRight" size="sm" color="inherit" />} />
      </HStack>
      <div className="hackboard-project-rail" role="region" aria-labelledby={id} tabIndex={0}>
        {projects.map((project) => <ProjectCard key={project.id} project={project} headingLevel={3} />)}
        <HStack className="hackboard-rail-end" hAlign="center" vAlign="center">
          <Button label="View more" href={href} variant="secondary" />
        </HStack>
      </div>
    </VStack>
  );
}

async function MonthlyProjects() {
  await connection();
  const { current, previous } = projectMonths(new Date());

  return (
    <>
      <ProjectRow id="this-month" title="This month" month={current} href="/projects" />
      <ProjectRow id="previous-month" title="Previous month" month={previous} href={`/archive?month=${previous}`} />
    </>
  );
}

export default function Home() {
  return (
    <VStack as="main" className="hackboard-shell hackboard-showcase hackboard-home" gap={10}>
      <Heading level={1} className="hackboard-visually-hidden">Student project showcase</Heading>
      <Suspense fallback={<Text color="secondary">Loading projects…</Text>}>
        <MonthlyProjects />
      </Suspense>
      <RecentActivity />
    </VStack>
  );
}
