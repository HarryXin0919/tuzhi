import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/knowledge",
      search: search.q ? { q: search.q } : {},
    });
  },
});
