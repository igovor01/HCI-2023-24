"use client";

import Spinner from "@/components/icons/Spinner";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  return session && session.user ? (
    <div className="flex items-center flex-col gap-4">
      <p>{session.user.firstName}</p>
      <p>{session.user.email}</p>
      <button className="text-red-600" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  ) : (
    <div>No data.</div>
  );
}