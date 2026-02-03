"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, PhoneOff, Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

// Error State Component
function ErrorScreen({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-red-200 bg-red-50">
        <CardContent className="p-8 text-center">
          <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PhoneOff className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            Couldn't Start Call
          </h2>
          <p className="text-stone-600 mb-6">{error}</p>
          <Button onClick={onRetry} size="lg" className="w-full h-14 text-lg">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Page Component
export default function SeniorCallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [error, setError] = useState<string>("");
  const requestId = searchParams?.get("requestId") || searchParams?.get("id") || "";
  const [roomID] = useState<string>(requestId ? `call_${requestId}` : `room_${Date.now()}`);

  useEffect(() => {
    if (state !== "connected" || typeof window === "undefined") return;

    const initCall = async () => {
      // Speak
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance("Starting video call...");
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }

      const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;

      if (!appID || !serverSecret) {
        setError("Video calls are not configured. Please contact support.");
        setState("error");
        return;
      }

      const userID = `senior_${Date.now()}`;
      const userName = "Senior";

      try {
        // Dynamically import ZegoUIKitPrebuilt
        const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          userID,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        
        const container = document.getElementById("zegocloud-container");
        if (!container) {
          throw new Error("Video container not found");
        }

        // Publish the room to Supabase so buddies can join/rejoin
        try {
          const supabase = createClient();
          if (requestId) {
            await supabase
              .from("help_requests")
              .update({ call_url: roomID })
              .eq("id", requestId);
          }
        } catch (e) {
          // Non-blocking: logging only
          console.warn("Failed to publish call_url", e);
        }

        zp.joinRoom({
          container: container,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showPreJoinView: false,
          showScreenSharingButton: false,
          showTextChat: false,
          showUserList: false,
          maxUsers: 2,
          onLeaveRoom: () => {
            router.push("/senior/dashboard");
          },
        });
      } catch (err) {
        console.error("Failed to start call:", err);
        setError("Failed to start call. Please try again.");
        setState("error");
      }
    };

    initCall();
  }, [state, roomID, router]);

  const startCall = () => {
    setState("connecting");
    // Add small delay to ensure UI renders before connecting
    setTimeout(() => {
      setState("connected");
    }, 500);
  };

  // Idle State - Auto-start
  if (state === "idle") {
    startCall();
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[80vh] flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-green-100 rounded-full p-8 mb-8"
        >
          <Phone className="h-20 w-20 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Connecting...</h2>
        <p className="text-xl text-stone-600 mb-2">Setting up your video call</p>
        <Loader2 className="h-8 w-8 text-green-500 animate-spin mt-4" />
      </motion.div>
    );
  }

  if (state === "connecting") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[80vh] flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-green-100 rounded-full p-8 mb-8"
        >
          <Phone className="h-20 w-20 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Connecting...</h2>
        <p className="text-xl text-stone-600 mb-2">Setting up your video call</p>
        <Loader2 className="h-8 w-8 text-green-500 animate-spin mt-4" />
      </motion.div>
    );
  }

  // Error State
  if (state === "error") {
    return <ErrorScreen error={error} onRetry={startCall} />;
  }

  // Connected State - Zegocloud handles the UI
  return (
    <div className="fixed inset-0 z-50">
      <div id="zegocloud-container" className="w-full h-full"></div>
    </div>
  );
}
