import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 space-y-6">
          <div>
            <Button asChild variant="ghost" size="sm" className="h-9 px-3">
              <Link href="/">← Back</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">All Reported Complaints</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Admin view: update status, filter, and review all submissions.
            </p>
          </div>

          <IssuesTable issues={serialized} isAdmin />
        </div>
      </main>
    </div>
  );
}
