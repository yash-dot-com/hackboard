import { Suspense } from "react";
import { connection } from "next/server";
import { Button } from "@/components/astryx/Button";
import { Card } from "@/components/astryx/Card";
import { HStack, VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { ProjectCard } from "@/components/project-card";
import { ProjectSearch } from "@/components/project-search";
import { formatProjectMonth, projectMonths, projectPreviews } from "@/lib/project-catalog";

async function ArchiveResults({ searchParams }: Pick<PageProps<"/archive">, "searchParams">) {
  await connection();
  const params = await searchParams;
  const month = typeof params.month === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(params.month) ? params.month : undefined;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const mode = params.mode === "search" ? "search" : undefined;
  const { current, previous, earlier } = projectMonths(new Date());
  const months = [current, previous, ...earlier];
  const options = month && !months.includes(month) ? [month, ...months] : months;
  const projects = (month ? months.filter((entry) => entry === month) : months)
    .flatMap(projectPreviews)
    .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));

  function filterHref(nextMonth?: string) {
    const filters = new URLSearchParams();
    if (mode) filters.set("mode", mode);
    if (query) filters.set("q", query);
    if (nextMonth) filters.set("month", nextMonth);
    return filters.size ? `/archive?${filters}` : "/archive";
  }

  return (
    <>
      <VStack gap={2}>
        <Heading level={1} type="display-1">{mode ? "Search projects" : "Project archive"}</Heading>
        <Text as="p" color="secondary">Browse the department showcase by publication month.</Text>
      </VStack>
      <Card>
        <VStack gap={4}>
          <ProjectSearch key={query} initialQuery={query} month={month} mode={mode} />
          <VStack gap={2}>
            <Text weight="semibold">Publication month</Text>
            <HStack as="nav" aria-label="Filter by publication month" gap={2} wrap="wrap">
              <Button label="All months" href={filterHref()} variant={!month ? "primary" : "secondary"} aria-current={!month ? "true" : undefined} />
              {options.map((option) => (
                <Button key={option} label={formatProjectMonth(option)} href={filterHref(option)}
                  variant={month === option ? "primary" : "secondary"} aria-current={month === option ? "true" : undefined} />
              ))}
            </HStack>
          </VStack>
        </VStack>
      </Card>
      <Text as="p" color="secondary">
        {projects.length} {projects.length === 1 ? "project" : "projects"}{month ? ` · ${formatProjectMonth(month)}` : ""}
      </Text>
      {projects.length ? (
        <div className="hackboard-project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      ) : (
        <Card><VStack gap={2} hAlign="start">
          <Heading level={2}>No projects found</Heading>
          <Text as="p" color="secondary">Try a different search or publication month.</Text>
          <Button label="Clear filters" href={mode ? "/archive?mode=search" : "/archive"} variant="secondary" />
        </VStack></Card>
      )}
    </>
  );
}

export default function ArchivePage({ searchParams }: PageProps<"/archive">) {
  return (
    <VStack as="main" className="hackboard-shell hackboard-showcase" gap={6}>
      <Suspense fallback={<Text color="secondary">Loading archive…</Text>}>
        <ArchiveResults searchParams={searchParams} />
      </Suspense>
    </VStack>
  );
}
