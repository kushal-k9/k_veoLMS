// Admin ops: coupons, transaction log + refunds, audit log, and settings.
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCoupons,
  useSaveCoupon,
  useDeleteCoupon,
  useTransactions,
  useRefund,
  useAuditLog,
  useSettings,
  useUpdateSettings,
} from "@/hooks/useOps";
import { getApiErrorMessage } from "@/lib/api/client";
import { formatPrice } from "@/lib/course";
import { downloadCsv } from "@/lib/csv";
import { Download, Plus, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function OpsTab() {
  return (
    <Tabs defaultValue="coupons">
      <TabsList>
        <TabsTrigger value="coupons">Coupons</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="audit">Audit log</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="coupons" className="mt-6">
        <CouponsAdmin />
      </TabsContent>
      <TabsContent value="transactions" className="mt-6">
        <TransactionsAdmin />
      </TabsContent>
      <TabsContent value="audit" className="mt-6">
        <AuditAdmin />
      </TabsContent>
      <TabsContent value="settings" className="mt-6">
        <SettingsAdmin />
      </TabsContent>
    </Tabs>
  );
}

function CouponsAdmin() {
  const { data: coupons = [] } = useCoupons();
  const save = useSaveCoupon();
  const del = useDeleteCoupon();
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percent" | "flat">("percent");
  const [value, setValue] = useState(10);
  const [usageLimit, setUsageLimit] = useState(0);

  const add = () => {
    if (!code.trim()) return toast.error("Code is required");
    save.mutate(
      { input: { code: code.toUpperCase(), type, value, usageLimit } },
      {
        onSuccess: () => {
          toast.success("Coupon created");
          setCode("");
        },
        onError: (e) => toast.error(getApiErrorMessage(e)),
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4">
        <div className="space-y-1.5">
          <Label>Code</Label>
          <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="SAVE20" className="w-32" />
        </div>
        <div className="space-y-1.5">
          <Label>Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as "percent" | "flat")}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percent">Percent %</SelectItem>
              <SelectItem value="flat">Flat $</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Value</Label>
          <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-24" />
        </div>
        <div className="space-y-1.5">
          <Label>Usage limit (0=∞)</Label>
          <Input type="number" value={usageLimit} onChange={(e) => setUsageLimit(Number(e.target.value))} className="w-28" />
        </div>
        <Button onClick={add} disabled={save.isPending}>
          <Plus className="mr-1.5 h-4 w-4" /> Add coupon
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono font-semibold">{c.code}</TableCell>
                <TableCell>{c.type === "percent" ? `${c.value}%` : formatPrice(c.value)}</TableCell>
                <TableCell>
                  {c.usedCount}
                  {c.usageLimit > 0 ? ` / ${c.usageLimit}` : ""}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={c.active}
                    onCheckedChange={(active) =>
                      save.mutate({ id: c.id, input: { active } as never })
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => del.mutate(c.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {coupons.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                  No coupons yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function TransactionsAdmin() {
  const { data: txns = [] } = useTransactions();
  const refund = useRefund();

  const exportCsv = () => {
    downloadCsv(
      "transactions.csv",
      ["Date", "User", "Course", "Amount", "Status"],
      txns.map((t) => [
        new Date(t.createdAt).toLocaleString(),
        typeof t.user === "string" ? t.user : t.user.email,
        typeof t.course === "string" ? t.course : t.course.title,
        String(t.amount),
        t.status,
      ]),
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={exportCsv} disabled={txns.length === 0}>
          <Download className="mr-1.5 h-4 w-4" /> Export CSV
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {txns.map((t) => {
              const user = typeof t.user === "string" ? null : t.user;
              const course = typeof t.course === "string" ? null : t.course;
              return (
                <TableRow key={t.id}>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user?.email ?? "—"}</TableCell>
                  <TableCell>{course?.title ?? "—"}</TableCell>
                  <TableCell>{formatPrice(t.amount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={t.status === "refunded" ? "destructive" : "secondary"}
                      className={t.status === "succeeded" ? "bg-success text-success-foreground" : ""}
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {t.status === "succeeded" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={refund.isPending}
                        onClick={() =>
                          refund.mutate(t.id, {
                            onSuccess: () => toast.success("Refunded"),
                            onError: (e) => toast.error(getApiErrorMessage(e)),
                          })
                        }
                      >
                        <RotateCcw className="mr-1 h-4 w-4" /> Refund
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {txns.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No transactions yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AuditAdmin() {
  const { data } = useAuditLog();
  const logs = data?.logs ?? [];
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>When</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((l) => (
            <TableRow key={l.id}>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(l.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>{l.actor?.name ?? l.actorEmail ?? "—"}</TableCell>
              <TableCell><Badge variant="secondary" className="font-mono text-[11px]">{l.action}</Badge></TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {l.entityType}
                {l.entityId ? ` · ${l.entityId.slice(-6)}` : ""}
              </TableCell>
            </TableRow>
          ))}
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                No audit entries yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function SettingsAdmin() {
  const { data: settings } = useSettings();
  const update = useUpdateSettings();
  const [form, setForm] = useState<Record<string, string>>({});

  const value = (key: string) =>
    form[key] !== undefined ? form[key] : String(settings?.[key] ?? "");
  const set = (key: string, v: string) => setForm((f) => ({ ...f, [key]: v }));

  const save = () => {
    const payload: Record<string, unknown> = { ...form };
    if (payload.taxPercent !== undefined) payload.taxPercent = Number(payload.taxPercent);
    update.mutate(payload, {
      onSuccess: () => {
        toast.success("Settings saved");
        setForm({});
      },
      onError: (e) => toast.error(getApiErrorMessage(e)),
    });
  };

  return (
    <div className="max-w-lg space-y-4 rounded-xl border bg-card p-5">
      <div className="space-y-1.5">
        <Label>Platform name</Label>
        <Input value={value("platformName")} onChange={(e) => set("platformName", e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <Input value={value("currency")} onChange={(e) => set("currency", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Tax (%)</Label>
          <Input type="number" value={value("taxPercent")} onChange={(e) => set("taxPercent", e.target.value)} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Stripe publishable key</Label>
        <Input value={value("stripePublishableKey")} onChange={(e) => set("stripePublishableKey", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Stripe secret key (write-only)</Label>
        <Input
          type="password"
          placeholder={settings?.stripeSecretKey === "********" ? "•••••••• (set)" : "Not set"}
          value={form.stripeSecretKey ?? ""}
          onChange={(e) => set("stripeSecretKey", e.target.value)}
        />
      </div>
      <Button onClick={save} disabled={update.isPending}>
        Save settings
      </Button>
    </div>
  );
}
