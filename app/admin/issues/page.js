import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import IssuesTable from "@/components/IssuesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isAdminEmail } from "@/lib/isAdminEmail";

export const dynamic = "force-dynamic";

export default async function AdminIssuesPage() {
  const user = await currentUser();
  if (!user || !isAdminEmail(user, process.env.ADMIN_EMAILS)) {
    redirect("/");
  }

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      description: true,
      issueType: true,
      severity: true,
      status: true,
      location: true,
      coordinates: true,
      locationName: true,
      imageUrl: true,
      createdAt: true,
      user: { select: { email: true, firstName: true, lastName: true } },
    },
  });

  const serialized = issues.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
  }));

  const openCount = issues.filter((i) => i.status !== "RESOLVED").length;
  const resolvedCount = issues.filter((i) => i.status === "RESOLVED").length;
  const total = issues.length;

  const stats = [
    { label: "Open Issues", value: openCount },
    { label: "Resolved", value: resolvedCount },
    { label: "Total Reported", value: total },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Manage Issues</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Admin view to triage, update status, and review all submissions.
              </p>
            </div>
            <div className="sm:min-w-[200px] flex sm:justify-end">
              <Button asChild variant="ghost" size="sm" className="h-9 px-3">
                <Link href="/">← Back</Link>
              </Button>
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((card) => (
              <div
                key={card.label}
                className="rounded-lg bg-white dark:bg-zinc-900/60 px-6 py-6 shadow-sm border border-zinc-200 dark:border-zinc-800"
              >
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {card.label}
                </p>
                <p className="mt-2 text-2xl font-semibold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-white dark:bg-zinc-900/60 px-6 py-4 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">All Reported Complaints</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Filter, search, and update status in one place.
                </p>
              </div>
            </div>
            <IssuesTable issues={serialized} isAdmin />
          </div>
        </div>
      </main>
    </div>
  );
}
