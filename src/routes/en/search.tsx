import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/search")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/en/knowledge",
      search: search.q ? { q: search.q } : {},
    } as never);
  },
});
