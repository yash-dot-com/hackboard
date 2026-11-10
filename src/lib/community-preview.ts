"use client";

import { useSyncExternalStore } from "react";
import type { Comment, Event, Opening } from "./community";

type Preview = {
  events: Event[];
  openings: Opening[];
  comments: Comment[];
  requests: { openingId: string; studentId: string }[];
};

const key = "hackboard.community-preview.v1";
const changeEvent = "hackboard-preview-change";
const empty: Preview = { events: [], openings: [], comments: [], requests: [] };
const initial = JSON.stringify(empty);

function snapshot() {
  return window.localStorage.getItem(key) ?? initial;
}

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(changeEvent, listener);
  };
}

export function useCommunityPreview(): Preview {
  return JSON.parse(useSyncExternalStore(subscribe, snapshot, () => initial));
}

export function updateCommunityPreview(update: (preview: Preview) => Preview) {
  const preview = update(JSON.parse(snapshot()));
  window.localStorage.setItem(key, JSON.stringify(preview));
  window.dispatchEvent(new window.Event(changeEvent));
}
