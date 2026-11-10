"use client";

import { List, ListItem } from "@astryxdesign/core/List";
import { useState } from "react";
import { TextArea } from "@astryxdesign/core/TextArea";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Badge } from "@/components/astryx/Badge";
import { Button } from "@/components/astryx/Button";
import { Card } from "@/components/astryx/Card";
import { Link } from "@/components/astryx/Link";
import { HStack, VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { demoStudent, eventDate, sampleEvents, sampleOpenings, students } from "@/lib/community";
import { updateCommunityPreview, useCommunityPreview } from "@/lib/community-preview";

export function EventDetail({ eventId }: { eventId: string }) {
  const [team, setTeam] = useState("");
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const { events, openings, requests } = useCommunityPreview();
  const event = [...events, ...sampleEvents].find(({ id }) => id === eventId);

  if (!event) {
    return (
      <VStack as="main" className="hackboard-shell hackboard-showcase hackboard-reading" gap={3}>
        <Heading level={1}>Event unavailable</Heading>
        <Text as="p">Events posted in this preview are only available in the browser where they were created.</Text>
        <Link href="/events">Browse events</Link>
      </VStack>
    );
  }

  const organizer = students.find(({ id }) => id === event.studentId);
  const eventOpenings = [...openings, ...sampleOpenings].filter((opening) => opening.eventId === eventId);

  return (
    <VStack as="main" className="hackboard-shell hackboard-showcase hackboard-reading" gap={8}>
      <VStack gap={3} hAlign="start">
        <Link href="/events">All events</Link>
        <Badge label="Community preview" />
        <Heading level={1} type="display-1" className="hackboard-user-text">{event.name}</Heading>
        <Text color="secondary">{eventDate(event.date)} · {event.location}</Text>
        <Text as="p" className="hackboard-user-text">{event.description}</Text>
        <Text color="secondary">Posted by <Link href={`/students/${event.studentId}`}>{organizer?.name}</Link></Text>
      </VStack>

      <VStack as="section" id="team-up" gap={4} aria-labelledby="team-up-title">
        <VStack gap={2}>
          <Heading level={2} id="team-up-title">Team up</Heading>
          <Text as="p" color="secondary">Teams post the skills they need. Send a request for a role that fits and share your HackBoard profile with the team.</Text>
        </VStack>
        {eventOpenings.length === 0 && <Text color="secondary">No teams are recruiting yet.</Text>}
        {eventOpenings.map((opening) => {
          const recruiter = students.find(({ id }) => id === opening.studentId);
          const applicants = requests.filter(({ openingId }) => openingId === opening.id);
          const requested = applicants.some(({ studentId }) => studentId === demoStudent.id);
          return (
            <Card key={opening.id}>
              <VStack gap={4}>
                <HStack gap={2} vAlign="center" hAlign="between" wrap="wrap">
                  <Heading level={3} className="hackboard-user-text">{opening.team}</Heading>
                  <Badge label={opening.skill} variant="blue" className="hackboard-user-text" />
                </HStack>
                <Text as="p" className="hackboard-user-text">{opening.description}</Text>
                <HStack gap={2} vAlign="center" hAlign="between" wrap="wrap">
                  <Link href={`/students/${opening.studentId}`}>View {recruiter?.name}’s work</Link>
                  {opening.studentId === demoStudent.id ? (
                    <Badge label="Your opening" />
                  ) : requested ? (
                    <Text role="status" color="secondary">Request sent in preview</Text>
                  ) : (
                    <Button
                      label="Send request"
                      aria-label={`Send request for the ${opening.skill} role on ${opening.team}`}
                      variant="primary"
                      clickAction={() => updateCommunityPreview((state) => {
                        if (state.requests.some(({ openingId, studentId }) => openingId === opening.id && studentId === demoStudent.id)) return state;
                        return { ...state, requests: [...state.requests, { openingId: opening.id, studentId: demoStudent.id }] };
                      })}
                    />
                  )}
                </HStack>
                {applicants.length > 0 && (
                  <List hasDividers>
                    {applicants.map(({ studentId }) => (
                      <ListItem
                        key={studentId}
                        label={students.find(({ id }) => id === studentId)?.name}
                        description="View applicant’s projects and achievements"
                        href={`/students/${studentId}`}
                        endContent={<Badge label="Pending" />}
                      />
                    ))}
                  </List>
                )}
              </VStack>
            </Card>
          );
        })}
      </VStack>

      <Card>
        <VStack
          as="form"
          gap={3}
          onSubmit={(submission) => {
            submission.preventDefault();
            if (!team.trim() || !skill.trim() || !description.trim()) return;
            updateCommunityPreview((state) => ({
              ...state, openings: [{ id: crypto.randomUUID(), createdAt: Date.now(), eventId, team: team.trim(), skill: skill.trim(), description: description.trim(), studentId: demoStudent.id }, ...state.openings],
            }));
            setTeam("");
            setSkill("");
            setDescription("");
          }}
        >
          <Heading level={2}>Recruit a teammate</Heading>
          <Text color="secondary">Say what you’re building and which skill your team needs. Posting as {demoStudent.name} in this preview.</Text>
          <TextInput label="Team name" value={team} onChange={(value) => setTeam(value.slice(0, 80))} isRequired />
          <TextInput label="Skill needed" value={skill} onChange={(value) => setSkill(value.slice(0, 60))} isRequired placeholder="e.g. Solana" />
          <TextArea label="What would they work on?" value={description} onChange={setDescription} rows={3} isRequired maxLength={1000} />
          <HStack><Button label="Post opening" type="submit" variant="primary" /></HStack>
        </VStack>
      </Card>
    </VStack>
  );
}
