"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SyncUser() {
  const { user, isLoaded } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (isLoaded && user && !synced) {
      console.log("🔄 Syncing user to database...", user.id);

      // Sync user to database when they log in
      fetch("/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(
                data.error || `HTTP error! status: ${res.status}`
              );
            });
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSynced(true);
            console.log("✅ User synced to database:", data.user);
          } else {
            console.error("❌ Sync failed:", data.error);
          }
        })
        .catch((error) => {
          console.error("❌ Error syncing user:", error.message);
        });
    }
  }, [user, isLoaded, synced]);

  return null; // This component doesn't render anything
}
