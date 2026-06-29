// Admin analytics dashboard: KPI cards + revenue/enrollment/top-course charts
// (recharts), with a daily/weekly/monthly range switcher.
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "@/components/ui/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAnalyticsOverview,
  useRevenueSeries,
  useEnrollmentTrends,
  useTopCourses,
} from "@/hooks/useAnalytics";
import type { AnalyticsRange } from "@/lib/endpoints/analytics.endpoints";
import { DollarSign, RotateCcw, ShoppingBag, Users } from "lucide-react";

function ChartCard({
  title,
  children,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card">
      <h3 className="mb-4 font-display font-bold">{title}</h3>
      {loading ? <Skeleton className="h-64 w-full" /> : children}
    </div>
  );
}

export function AnalyticsTab() {
  const [range, setRange] = useState<AnalyticsRange>("daily");
  const { data: overview, isLoading: ovLoading } = useAnalyticsOverview();
  const { data: revenue = [], isLoading: revLoading } = useRevenueSeries(range);
  const { data: enrollments = [], isLoading: enrLoading } = useEnrollmentTrends(range);
  const { data: topCourses = [], isLoading: topLoading } = useTopCourses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Platform performance at a glance.</p>
        <Select value={range} onValueChange={(v) => setRange(v as AnalyticsRange)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI cards */}
      {ovLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : overview ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total revenue"
            value={overview.totalRevenue}
            prefix="$"
            decimals={2}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard
            label="Total sales"
            value={overview.totalSales}
            icon={<ShoppingBag className="h-5 w-5" />}
          />
          <StatCard
            label="Refunds"
            value={overview.refunds}
            icon={<RotateCcw className="h-5 w-5" />}
          />
          <StatCard
            label="Active students"
            value={overview.activeStudents}
            icon={<Users className="h-5 w-5" />}
          />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue */}
        <ChartCard title="Revenue" loading={revLoading}>
          <ResponsiveContainer width="100%" height={256}>
            <AreaChart data={revenue} margin={{ left: -16, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `$${v}`} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#revFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Enrollments */}
        <ChartCard title="Enrollment trend" loading={enrLoading}>
          <ResponsiveContainer width="100%" height={256}>
            <LineChart data={enrollments} margin={{ left: -16, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top courses */}
        <ChartCard title="Top courses by sales" loading={topLoading}>
          {topCourses.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={256}>
              <BarChart
                data={topCourses}
                layout="vertical"
                margin={{ left: 8, right: 16 }}
              >
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="title"
                  width={120}
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickFormatter={(t: string) => (t.length > 18 ? `${t.slice(0, 17)}…` : t)}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="sales" radius={[0, 6, 6, 0]} fill="var(--chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Completion rates */}
      {topCourses.length > 0 && (
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display font-bold">Completion rates</h3>
          <ul className="space-y-3">
            {topCourses.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <span className="w-40 truncate text-sm font-medium">{c.title}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${c.completionRate}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                  {c.completionRate}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--popover-foreground)",
};

function EmptyChart() {
  return (
    <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
      No data yet.
    </div>
  );
}
