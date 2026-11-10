"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextArea } from "@astryxdesign/core/TextArea";
import { DateInput } from "@astryxdesign/core/DateInput";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Button } from "@/components/astryx/Button";
import { Card } from "@/components/astryx/Card";
import { HStack, VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { EventList } from "@/components/community-lists";
import { demoStudent } from "@/lib/community";
import { updateCommunityPreview } from "@/lib/community-preview";

export default function EventsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState<React.ComponentProps<typeof DateInput>["value"]>();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <VStack as="main" className="hackboard-shell hackboard-showcase hackboard-reading" gap={8}>
      <VStack gap={3}>
        <Heading level={1} type="display-1">Hackathons &amp; events</Heading>
        <Text as="p" color="secondary">Find something to build, meet teammates, or share an event with the department.</Text>
        <EventList />
      </VStack>
      <Card>
        <VStack
          as="form"
          gap={3}
          onSubmit={(event) => {
            event.preventDefault();
            if (!name.trim() || !date || !location.trim() || !description.trim()) return;
            const id = crypto.randomUUID();
            updateCommunityPreview((state) => ({
              ...state, events: [{ id, createdAt: Date.now(), name: name.trim(), date, location: location.trim(), description: description.trim(), studentId: demoStudent.id }, ...state.events],
            }));
            router.push(`/events/${id}`);
          }}
        >
          <Heading level={2}>Post an event</Heading>
          <Text color="secondary">Events you post here are saved in this browser preview.</Text>
          <TextInput label="Event name" value={name} onChange={(value) => setName(value.slice(0, 100))} isRequired />
          <DateInput label="Date" presentation="native" value={date} onChange={setDate} isRequired />
          <TextInput label="Location" value={location} onChange={(value) => setLocation(value.slice(0, 120))} isRequired />
          <TextArea label="What’s happening?" value={description} onChange={setDescription} isRequired rows={3} maxLength={1000} />
          <HStack><Button label="Post event" type="submit" variant="primary" /></HStack>
        </VStack>
      </Card>
    </VStack>
  );
}
