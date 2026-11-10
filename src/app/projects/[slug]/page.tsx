import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Outline, type OutlineItem } from "@astryxdesign/core/Outline";
import { Badge } from "@/components/astryx/Badge";
import { Card } from "@/components/astryx/Card";
import { Divider } from "@/components/astryx/Divider";
import { Icon } from "@/components/astryx/Icon";
import { Link } from "@/components/astryx/Link";
import { VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { projects, students } from "@/lib/community";
import { Discussion } from "./discussion";

const outline: OutlineItem[] = [
  { id: "overview", label: "Overview", level: 2 },
  { id: "usage", label: "How it works", level: 2 },
  { id: "feedback", label: "What to try", level: 2 },
  { id: "discussion", label: "Discussion", level: 2 },
];

export function generateStaticParams() {
  return projects.map(({ id }) => ({ slug: id }));
}

async function ProjectRoute({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find(({ id }) => id === slug);
  if (!project) notFound();
  const student = students.find(({ id }) => id === project.studentId);

  return (
    <main className="hackboard-shell hackboard-showcase hackboard-doc">
      <VStack gap={3} hAlign="start">
        <Link href="/">All projects</Link>
        <Badge label="Example project" />
        <Heading level={1} type="display-1">{project.name}</Heading>
        <Text color="secondary">Built by <Link href={`/students/${project.studentId}`}>{student?.name}</Link></Text>
      </VStack>
      <aside className="hackboard-doc-outline" aria-label="Page outline">
        <Outline items={outline} label="On this page" />
      </aside>
      <VStack as="article" gap={8}>
        <Card className="hackboard-doc-preview" variant="muted">
          <VStack gap={2} hAlign="center">
            <Icon icon="viewColumns" size="lg" color="accent" />
            <Text color="secondary">Project preview</Text>
          </VStack>
        </Card>
        <VStack gap={2}>
          <Heading level={2} id="overview">Overview</Heading>
          <Text as="p" type="large" weight="normal">{project.summary}</Text>
        </VStack>
        <VStack gap={2}>
          <Heading level={2} id="usage">How it works</Heading>
          <Text as="p">{project.usage}</Text>
        </VStack>
        <VStack gap={2}>
          <Heading level={2} id="feedback">What to try</Heading>
          <Text as="p">{project.feedback}</Text>
        </VStack>
        <Divider />
        <Discussion projectId={project.id} />
      </VStack>
    </main>
  );
}

export default function ProjectPage(props: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={null}>
      <ProjectRoute {...props} />
    </Suspense>
  );
}
