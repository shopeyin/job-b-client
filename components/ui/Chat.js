"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { startChat } from "@/lib/api";

function Chat({ candidate, token }) {
  console.log(candidate);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Handler to start a chat
  const handleStartChat = async () => {
    setLoading(true);
    try {
      const chatData = await startChat(candidate._id, token);
      console.log(chatData);
      if (chatData?.data) {
        // Redirect to the chat page
        router.push(
          `/employer/candidates/${candidate._id}/chat/${chatData.data._id}`
        );
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-gray-600 mb-4">
        Want to reach out to {candidate?.name}? Start a chat now!
      </p>

      <button
        onClick={handleStartChat}
        disabled={loading}
        className="bg-teal hover:bg-dark-blue text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        {loading ? "Starting chat..." : "Start Chat"}
      </button>
    </div>
  );
}

export default Chat;
