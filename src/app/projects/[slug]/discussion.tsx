"use client";

import { useState } from "react";
import { TextArea } from "@astryxdesign/core/TextArea";
import { List, ListItem } from "@astryxdesign/core/List";
import { Button } from "@/components/astryx/Button";
import { Link } from "@/components/astryx/Link";
import { HStack, VStack } from "@/components/astryx/Stack";
import { Heading, Text } from "@/components/astryx/Text";
import { demoStudent, sampleComments, students } from "@/lib/community";
import { updateCommunityPreview, useCommunityPreview } from "@/lib/community-preview";

export function Discussion({ projectId }: { projectId: string }) {
  const [body, setBody] = useState("");
  const { comments } = useCommunityPreview();
  const thread = [...sampleComments, ...comments].filter((comment) => comment.projectId === projectId);

  return (
    <VStack as="section" gap={4} aria-labelledby="discussion">
      <Heading level={2} id="discussion">Discussion</Heading>
      {thread.length ? (
        <List hasDividers>
          {thread.map((comment) => {
            const author = students.find(({ id }) => id === comment.studentId);
            return (
              <ListItem
                key={comment.id}
                label={<Link href={`/students/${comment.studentId}`}>{author?.name}</Link>}
                description={<Text as="p" className="hackboard-user-text">{comment.body}</Text>}
              />
            );
          })}
        </List>
      ) : <Text color="secondary">No comments yet. Share the first bit of feedback.</Text>}
      <VStack
        as="form"
        gap={3}
        onSubmit={(event) => {
          event.preventDefault();
          if (!body.trim()) return;
          updateCommunityPreview((state) => ({
            ...state,
            comments: [...state.comments, { id: crypto.randomUUID(), createdAt: Date.now(), projectId, studentId: demoStudent.id, body: body.trim() }],
          }));
          setBody("");
        }}
      >
        <TextArea label="Leave feedback" value={body} onChange={setBody} rows={3} isRequired maxLength={1000} />
        <HStack gap={3} vAlign="center" wrap="wrap">
          <Button label="Post comment" type="submit" variant="primary" />
          <Text color="secondary">Posting as {demoStudent.name} in this browser preview.</Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
