"use client";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { pusherClient } from "../../lib/pusher-client";
import { useChatStore } from "../../lib/store";
import { Members } from "pusher-js";
import FriendsList from "./FriendsList";

type PresenceMember = {
  id: string;
};

export default function LeftSidebar() {
  const [sideberOpen, setSideberOpen] = useState(true);
  const { onlineIds } = useChatStore();

  useEffect(() => {
    const channel = pusherClient.subscribe("presence-online-users");

    //initial members list
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      useChatStore.setState({
        onlineIds: Object.keys(members.members),
      });
    });

    //add logged in user as a member
    channel.bind("pusher:member_added", (member: PresenceMember) => {
      useChatStore.setState((state) => {
        if (state.onlineIds.includes(member.id)) return state;
        return { onlineIds: [...state.onlineIds, member.id] };
      });
    });

    //remove users when they go offline
    channel.bind("pusher:member_removed", (member: PresenceMember) => {
      useChatStore.setState((state) => ({
        onlineIds: state.onlineIds.filter((id) => id !== member.id),
      }));
    });

    return () => {
      pusherClient.unsubscribe("presence-online-users");
    };
  }, []);

  const toggleSidebar = () => setSideberOpen((prev) => !prev);
  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 grid place-items-center text-white rounded-full z-[60] cursor-pointer md:hidden shadow-lg"
      >
        <AiFillMessage size={22} />
      </button>

      {/* Sidebar */}
      <aside
        className={`min-h-screen bg-slate-950 fixed top-0 left-0 md:w-[350px] w-full border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
          sideberOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50`}
      >
        <div className="relative p-4">
          {/* Header */}
          <div className="w-full absolute top-0 left-0 p-4 flex justify-between items-center border-b border-gray-700">
            <span className="text-2xl font-bold text-gray-400">Friends</span>
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl grid place-items-center">
              <FaUsers />
            </div>
          </div>

          {/* Friends list */}
          <div className="mt-16">
            {/* <FriendsList /> */}
            <FriendsList
              onlineIds={onlineIds}
              setSideberOpen={setSideberOpen}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
