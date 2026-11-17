"use client";

import { useRouter, useSearchParams } from "next/navigation"; 
import { Chat } from "../../components/Chat";
import { Spinner } from "../../components/Spinner";
import { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";


export default function RoomChat() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/Account");
    }
  }, [status, router]);

  return (
    <Suspense fallback={<Spinner />}>
      <ChatWrapper />
    </Suspense>
  );
}

function ChatWrapper() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomid");
  const roomname = searchParams.get("roomname");

  if (!roomId) return <Spinner />;
  return <Chat roomId={roomId} roomname={roomname ?? "Untitled Room"} />;
}
