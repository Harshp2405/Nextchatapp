"use client";
import ChatInput from "@/components/Chatinput";
import Image from "next/image";
import React from "react";
import { useChatStore } from "../../../lib/store";
import { FaUser } from "react-icons/fa6";
import { useGetMessage } from "../../../custom-hooks/useMessage";
import ChatWindow from "@/components/Chatwindow";
import { SpinnerCircularFixed } from "spinners-react";

export default function Page() {
  const { activeChatUser, onlineIds } = useChatStore();
  const receiverId = activeChatUser?.id;
  const { messages, isLoading, isError } = useGetMessage(receiverId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-30">
        <SpinnerCircularFixed size={30} color="#4f39f6" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-400">Error Fetching Messages</p>
      </div>
    );
  }

  if (!activeChatUser) {
    return (
      <div className="flex flex-col h-screen items-center justify-center px-1">
        <div className="text-center space-y-1 max-w-md">
          <div className="text-indigo-600 flex justify-center">
            <FaUser size={60} />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
            Select a user to start chatting
          </h2>
          <p className="text-gray-500 text-base">
            Your conversations will appear here once you start a chat.
          </p>
        </div>
      </div>
    );
  }

  // 📍 Chat UI
  return (
    <div className="flex flex-col h-screen flex-1 bg-[#0f0f11] border-l border-gray-800">
      {/* 🧭 Header */}
      <div className="flex items-center gap-3 border-b border-gray-800 px-4 py-3 bg-[#1a1a1d]">
        {activeChatUser.avatar ? (
          <Image
            src={activeChatUser.avatar}
            alt="profile-pic"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            <FaUser size={20} />
          </div>
        )}

        <div>
          <p className="font-semibold text-white text-lg">
            {activeChatUser.name}
          </p>
          {onlineIds.includes(activeChatUser.id) ? (
            <span className="text-sm text-green-400">● Online</span>
          ) : (
            <span className="text-sm text-gray-400">Offline</span>
          )}
        </div>
      </div>

      {/* 💬 Chat Window */}
      <div className="flex-1 overflow-y-auto px-4 pb-2 bg-[#0f0f11]">
        <ChatWindow messages={messages} />
      </div>

      {/* 📝 Chat Input */}
      <div className="border-t border-gray-800 bg-[#1a1a1d] p-3">
        <ChatInput />
      </div>
    </div>
  );
}