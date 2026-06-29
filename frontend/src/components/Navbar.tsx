import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { AdminModeToggle } from "@/components/AdminModeToggle";
import { CartDrawer } from "@/components/CartDrawer";
import { NotificationBell } from "@/components/NotificationBell";
import { useCartStore } from "@/stores/cartStore";

function CartButton() {
  const count = useCartStore((s) => s.items.length);
  const open = useCartStore((s) => s.open);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={open}
      aria-label={`Cart (${count})`}
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap size={20} />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
        Veo<span className="text-primary">LMS</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { user, isStaff } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => {
        toast.success("Signed out successfully");
        navigate({ to: "/" });
      },
    });
  };

  const navLinks = [
    { label: "Home", to: "/" as const },
    { label: "Courses", to: "/courses" as const },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/85 backdrop-blur supports-[backdrop-filter]:bg-card/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <BrandLogo />
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {user && <NotificationBell />}
          <CartButton />
          {isStaff && <AdminModeToggle className="hidden md:inline-flex" />}
          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border bg-card py-1 pl-1 pr-3 transition-colors hover:bg-accent">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isStaff ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
                        <Shield className="mr-2 h-4 w-4" /> Admin Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
                        <BookOpen className="mr-2 h-4 w-4" /> My Learning
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
                      <LayoutDashboard className="mr-2 h-4 w-4" /> My Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get started</Link>
              </Button>
            </div>
          )}

          {/* Cart slide-over (rendered once; opened via CartButton/store) */}
          <CartDrawer />

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <BrandLogo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                  >
                    {l.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <div className="my-2 flex items-center gap-3 rounded-lg border p-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {isStaff && (
                      <AdminModeToggle
                        className="my-2 self-start"
                        onSelect={() => setOpen(false)}
                      />
                    )}
                    {isStaff ? (
                      <>
                        <Link
                          to="/admin"
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                        >
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                        >
                          My Learning
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                      >
                        My Dashboard
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign out
                    </Button>
                  </>
                ) : (
                  <div className="mt-3 flex flex-col gap-2">
                    <Button variant="outline" asChild onClick={() => setOpen(false)}>
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link to="/signup">Get started</Link>
                    </Button>
                  </div>
                )}
              </div>
              {pathname.startsWith("/learn") && (
                <p className="mt-6 px-3 text-xs text-muted-foreground">
                  <UserIcon className="mr-1 inline h-3 w-3" /> You're in a lesson player.
                </p>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
