"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { isAdminEmail } from "@/lib/isAdminEmail";

export default function Topbar() {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();

  const isAdmin = useMemo(() => isAdminEmail(user), [user]);

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-semibold">
            Civic Voice
          </Link>
        </div>

        <div className="flex flex-1 justify-center items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-semibold transition ${
              pathname === "/"
                ? "text-primary"
                : "text-zinc-700/70 dark:text-zinc-200/70 hover:text-primary dark:hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/issues"
            className={`text-sm font-semibold transition ${
              pathname === "/issues"
                ? "text-primary"
                : "text-zinc-700/70 dark:text-zinc-200/70 hover:text-primary dark:hover:text-primary"
            }`}
          >
            Issues
          </Link>
          <Link
            href="/user"
            className={`text-sm font-semibold transition ${
              pathname === "/user"
                ? "text-primary"
                : "text-zinc-700/70 dark:text-zinc-200/70 hover:text-primary dark:hover:text-primary"
            }`}
          >
            User
          </Link>
          {isAdmin && (
            <Link
              href="/admin/issues"
              className={`text-sm font-semibold transition ${
                pathname === "/admin/issues"
                  ? "text-primary"
                  : "text-zinc-700/70 dark:text-zinc-200/70 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isSignedIn && user ? (
            <>
              <span className="hidden sm:inline text-sm text-zinc-600 dark:text-zinc-400">
                {user.firstName ||
                  user.primaryEmailAddress?.emailAddress ||
                  user.emailAddresses[0]?.emailAddress}
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
  );
}
