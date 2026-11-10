import { Suspense } from "react";
import { notFound } from "next/navigation";
import { List, ListItem } from "@astryxdesign/core/List";
import { Badge } from "@/components/astryx/Badge";
import { HStack, VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { projects, students } from "@/lib/community";

export function generateStaticParams() {
  return students.map(({ id }) => ({ slug: id }));
}

async function StudentRoute({ params }: PageProps<"/students/[slug]">) {
  const { slug } = await params;
  const student = students.find(({ id }) => id === slug);
  if (!student) notFound();

  return (
    <VStack as="main" className="hackboard-shell hackboard-showcase hackboard-reading" gap={8}>
      <VStack gap={3} hAlign="start">
        <Badge label="Example student" />
        <Heading level={1} type="display-1">{student.name}</Heading>
        <Text as="p" color="secondary">{student.bio}</Text>
        <HStack gap={2} wrap="wrap">
          {student.skills.map((skill) => <Badge key={skill} label={skill} variant="blue" />)}
        </HStack>
      </VStack>
      <VStack as="section" gap={3}>
        <Heading level={2}>Projects</Heading>
        <List hasDividers>
          {projects.filter(({ studentId }) => studentId === student.id).map((project) => (
            <ListItem key={project.id} label={project.name} description={project.summary} href={`/projects/${project.id}`} />
          ))}
        </List>
      </VStack>
      <VStack as="section" gap={3}>
        <Heading level={2}>Achievements</Heading>
        <List hasDividers>
          {student.achievements.map((achievement) => <ListItem key={achievement} label={achievement} />)}
        </List>
      </VStack>
    </VStack>
  );
}

export default function StudentPage(props: PageProps<"/students/[slug]">) {
  return (
    <Suspense fallback={null}>
      <StudentRoute {...props} />
    </Suspense>
  );
}
