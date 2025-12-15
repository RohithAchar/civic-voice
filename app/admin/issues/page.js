import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import IssuesTable from "@/components/IssuesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield } from "lucide-react";

export const dynamic = "force-dynamic";

function isAdminEmail(user) {
  const env = process.env.ADMIN_EMAILS || "";
  const list = env
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (process.env.NODE_ENV === "development") {
    console.log("ADMIN_EMAILS list:", list);
    console.log("Current user email:", email, "isAdmin:", email ? list.includes(email) : false);
  }
  return email && list.includes(email);
}

export default async function AdminIssuesPage() {
  const user = await currentUser();
  if (!user || !isAdminEmail(user)) {
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
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <Link href="/" className="text-xl font-semibold">
              Civic Voice
            </Link>
          </div>

          <div className="flex flex-1 justify-center items-center gap-6">
            <Link
              href="/issues"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition"
            >
              My Issues
            </Link>
            <span className="text-sm font-semibold text-primary">
              Admin Issues
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-zinc-600 dark:text-zinc-400">
              {user.firstName || user.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

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

