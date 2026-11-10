"use client";

import { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Button } from "@/components/astryx/Button";

export function ProjectSearch({ initialQuery, month, mode }: { initialQuery: string; month?: string; mode?: string }) {
  const [query, setQuery] = useState(initialQuery);

  return (
    <form id="project-search" className="hackboard-search" action="/archive" method="get" role="search">
      {month && <input type="hidden" name="month" value={month} />}
      {mode && <input type="hidden" name="mode" value={mode} />}
      <TextInput label="Search projects" isLabelHidden type="search" htmlName="q" placeholder="Search projects"
        value={query} onChange={setQuery} />
      <Button label="Search" type="submit" variant="primary" />
    </form>
  );
}
