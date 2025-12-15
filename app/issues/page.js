import { prisma } from "@/lib/prisma";
import IssuesTable from "@/components/IssuesTable";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function IssuesPage() {
  const user = await currentUser();

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      description: true,
      issueType: true,
      severity: true,
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

          <div className="flex flex-1 justify-center">
            <Link href="/issues" className="text-sm font-semibold text-primary">
              Issues
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-zinc-600 dark:text-zinc-400">
                  {user.firstName || user.emailAddresses[0]?.emailAddress}
                </span>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
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
            <h1 className="text-3xl font-semibold">Reported Complaints</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Filter by type, severity, location, and search across
              descriptions.
            </p>
          </div>

          <IssuesTable issues={serialized} />
        </div>
      </main>
    </div>
  );
}
