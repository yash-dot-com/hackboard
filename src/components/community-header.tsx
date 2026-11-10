"use client";

import { Archive, CalendarDays, Search, UserRound } from "lucide-react";
import { Button } from "@/components/astryx/Button";
import { Divider } from "@/components/astryx/Divider";
import { Icon } from "@/components/astryx/Icon";
import { NavIcon } from "@/components/astryx/NavIcon";
import { HStack } from "@/components/astryx/Stack";
import { TopNav, TopNavHeading, TopNavItem } from "@/components/astryx/TopNav";
import { demoStudent } from "@/lib/community";

export function CommunityHeader() {
  return (
    <header className="hackboard-header">
      <TopNav
        className="hackboard-shell hackboard-nav"
        label="Main navigation"
        heading={<TopNavHeading heading="HackBoard" headingHref="/"
          logo={<NavIcon icon={<Icon icon="viewColumns" size="sm" color="inherit" />} />} />}
        centerContent={
          <HStack className="hackboard-nav-links" gap={1} vAlign="center">
            <TopNavItem label="Archive" href="/archive" icon={<Icon icon={Archive} size="sm" />} />
            <TopNavItem label="Search" href="/archive?mode=search#project-search" icon={<Icon icon={Search} size="sm" />} />
            <TopNavItem label="Events" href="/events" icon={<Icon icon={CalendarDays} size="sm" />} />
          </HStack>
        }
        endContent={
          <Button label="Student profile" href={`/students/${demoStudent.id}`} variant="secondary" isIconOnly
            icon={<Icon icon={UserRound} color="inherit" />} />
        }
      />
      <Divider />
    </header>
  );
}
