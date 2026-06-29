import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for /courses and /courses/$courseId. Children render in <Outlet />.
export const Route = createFileRoute("/courses")({
  component: () => <Outlet />,
});
