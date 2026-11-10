"use client";

import { List, ListItem } from "@astryxdesign/core/List";
import { Card } from "@/components/astryx/Card";
import { Icon } from "@/components/astryx/Icon";
import { VStack } from "@/components/astryx/Stack";
import { Heading } from "@/components/astryx/Text";
import { eventDate, projects, sampleEvents, students } from "@/lib/community";
import { useCommunityPreview } from "@/lib/community-preview";

export function EventList({ limit }: { limit?: number }) {
  const { events } = useCommunityPreview();

  return (
    <List hasDividers>
      {[...events, ...sampleEvents].slice(0, limit).map((event) => (
        <ListItem
          key={event.id}
          label={event.name}
          description={`${eventDate(event.date)} · ${event.location}`}
          href={`/events/${event.id}`}
        />
      ))}
    </List>
  );
}

export function RecentActivity() {
  const { events, comments, openings } = useCommunityPreview();
  const activity = [
    ...events.map((event) => ({
      id: event.id, time: event.createdAt ?? 0, label: `New event · ${event.name}`, description: event.location, href: `/events/${event.id}`,
    })),
    ...openings.map((opening) => ({
      id: opening.id, time: opening.createdAt ?? 0, label: `${opening.team} is recruiting`, description: `Looking for ${opening.skill}`, href: `/events/${opening.eventId}#team-up`,
    })),
    ...comments.map((comment) => ({
      id: comment.id, time: comment.createdAt ?? 0, label: `New comment on ${projects.find(({ id }) => id === comment.projectId)?.name}`,
      description: students.find(({ id }) => id === comment.studentId)?.name, href: `/projects/${comment.projectId}#discussion`,
    })),
    { id: "activity-compass", time: 0, label: "Ananya shared Campus Compass", description: "Project showcase", href: "/projects/campus-compass" },
    { id: "activity-build-night", time: 0, label: "Campus Credits is recruiting", description: "Looking for Solana experience", href: "/events/campus-build-night#team-up" },
  ];

  return (
    <VStack as="section" gap={4} aria-labelledby="recent-activity">
      <Heading level={2} id="recent-activity" type="display-3">Recent activity</Heading>
      <Card padding={2}>
        <List hasDividers>
          {activity.sort((a, b) => b.time - a.time).slice(0, 5).map(({ id, label, description, href }) => (
            <ListItem key={id} label={label} description={description} href={href}
              startContent={<Icon icon={href.startsWith("/events") ? "calendar" : "viewColumns"} color="accent" />}
              endContent={<Icon icon="chevronRight" size="sm" color="secondary" />} />
          ))}
        </List>
      </Card>
    </VStack>
  );
}
