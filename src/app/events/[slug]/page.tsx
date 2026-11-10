import { Suspense } from "react";
import { sampleEvents } from "@/lib/community";
import { EventDetail } from "./event-detail";

export function generateStaticParams() {
  return sampleEvents.map(({ id }) => ({ slug: id }));
}

async function EventRoute({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  return <EventDetail eventId={slug} />;
}

export default function EventPage(props: PageProps<"/events/[slug]">) {
  return (
    <Suspense fallback={null}>
      <EventRoute {...props} />
    </Suspense>
  );
}
