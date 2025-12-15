import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReportIssueButton from "@/components/ReportIssueButton";
import { MapPin, Shield, TrendingUp, Users } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 font-sans">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Civic Voice</h1>
          </div>

          <div className="flex flex-1 justify-center">
            <Link
              href="/issues"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition"
            >
              My Issues
            </Link>
            {user &&
              process.env.ADMIN_EMAILS?.toLowerCase().includes(
                (user.emailAddresses[0]?.emailAddress || "").toLowerCase()
              ) && (
                <Link
                  href="/admin/issues"
                  className="ml-6 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition"
                >
                  Admin
                </Link>
              )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-zinc-600 dark:text-zinc-400">
                  Welcome,{" "}
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
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-zinc-50">
                Civic Voice
                <br />
                <span className="text-primary">
                  Turn local problems into visible action.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Snap a photo, add details, and we send it straight to BBMP via
                email. A fast, simple MVP to get issues in front of the right
                people during the hackathon.
              </p>
            </div>

            {/* Report Issue Button Section */}
            <div className="pt-8">
              {user ? (
                <div className="space-y-6">
                  <ReportIssueButton />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    Sign in to report issues
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="text-base px-8 py-6 h-auto"
                    >
                      <Link href="/sign-up">Get Started</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="text-base px-8 py-6 h-auto"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-zinc-50">
              How the MVP Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-zinc-50">
                  Capture & Describe
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Take a photo, add location, category, and severity in under a
                  minute.
                </p>
              </div>

              <div className="text-center space-y-4 p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-zinc-50">
                  Auto Email to BBMP
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We package your report and send it directly to BBMP via email.
                </p>
              </div>

              <div className="text-center space-y-4 p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-zinc-50">
                  Simple Confirmation
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  You get a confirmation once your report email is sent to BBMP.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>© 2024 Civic Voice. Making cities better, one report at a time.</p>
        </div>
      </footer>
    </div>
  );
}
