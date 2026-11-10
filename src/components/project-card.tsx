import { Card } from "@/components/astryx/Card";
import { HStack, VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { formatProjectMonth, type ProjectPreview } from "@/lib/project-catalog";

export function ProjectCard({ project, headingLevel = 2 }: { project: ProjectPreview; headingLevel?: 2 | 3 }) {
  return (
    <Card className="hackboard-project-card" padding={0}>
      <div className="hackboard-cover" aria-hidden="true" />
      <VStack gap={1} padding={4}>
        <Heading level={headingLevel}>{project.name}</Heading>
        <HStack gap={2} hAlign="between" vAlign="center" wrap="wrap">
          <Text type="supporting" color="secondary">Placeholder</Text>
          <Text type="supporting" color="secondary">{formatProjectMonth(project.month)}</Text>
        </HStack>
      </VStack>
    </Card>
  );
}
