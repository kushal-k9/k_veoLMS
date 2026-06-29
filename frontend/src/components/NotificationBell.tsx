// Navbar notification bell: unread badge + dropdown list with mark-read.
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { data } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();
  const notifications = data?.notifications ?? [];
  const unread = data?.unread ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground"
            >
              {unread > 9 ? "9+" : unread}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-sm font-semibold">Notifications</span>
          {unread > 0 && (
            <button
              onClick={() => markAll.mutate()}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <CheckCheck className="h-3 w-3" /> Mark all read
            </button>
          )}
        </div>
        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              You're all caught up.
            </p>
          ) : (
            <ul className="divide-y">
              {notifications.map((n) => {
                const content = (
                  <div
                    className={cn(
                      "px-3 py-2.5 transition-colors hover:bg-accent",
                      !n.read && "bg-primary/5",
                    )}
                    onClick={() => !n.read && markRead.mutate(n.id)}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                      <div className={cn("min-w-0", n.read && "pl-4")}>
                        <p className="text-sm font-medium">{n.title}</p>
                        {n.body && (
                          <p className="line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
                        )}
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
                return (
                  <li key={n.id}>
                    {n.link ? (
                      <a href={n.link} onClick={() => !n.read && markRead.mutate(n.id)}>
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
