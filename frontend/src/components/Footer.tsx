import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap size={20} />
            </span>
            <span className="font-display text-xl font-extrabold">VeoLMS</span>
          </div>
          <p className="mt-3 text-sm text-brand-foreground/70">
            Learn without limits. Expert-led courses to level up your career.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-bold">Explore</h4>
          <ul className="space-y-2 text-sm text-brand-foreground/70">
            <li><Link to="/" className="hover:text-brand-foreground">Home</Link></li>
            <li><Link to="/courses" className="hover:text-brand-foreground">All Courses</Link></li>
            <li><Link to="/login" className="hover:text-brand-foreground">Log in</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-bold">Categories</h4>
          <ul className="space-y-2 text-sm text-brand-foreground/70">
            <li>Web Development</li>
            <li>Frontend</li>
            <li>Backend</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-bold">Demo accounts</h4>
          <ul className="space-y-1 text-xs text-brand-foreground/60">
            <li>admin@veolms.com / admin123</li>
            <li>student@veolms.com / student123</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-foreground/10 py-4 text-center text-xs text-brand-foreground/50">
        © {new Date().getFullYear()} VeoLMS · Built as a demo. Payments are simulated.
      </div>
    </footer>
  );
}
