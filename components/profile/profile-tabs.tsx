"use client";

import { useState } from "react";
import { BookOpen, BookMarked, Star, List, BookCheck } from "lucide-react";

const tabs = [
  { id: "read", label: "Read", icon: BookCheck },
  { id: "reading", label: "Currently Reading", icon: BookOpen },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "lists", label: "Lists", icon: List },
  { id: "want", label: "Want to Read", icon: BookMarked },
] as const;

type TabId = (typeof tabs)[number]["id"];

export const ProfileTabs = ({ username }: { username: string }) => {
  const [activeTab, setActiveTab] = useState<TabId>("read");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-secondary">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-shelvitas-green text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content placeholder */}
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          {activeTab === "read" && `${username}'s read books will appear here.`}
          {activeTab === "reading" &&
            `Books ${username} is currently reading will appear here.`}
          {activeTab === "reviews" && `${username}'s reviews will appear here.`}
          {activeTab === "lists" && `${username}'s lists will appear here.`}
          {activeTab === "want" &&
            `Books ${username} wants to read will appear here.`}
        </p>
      </div>
    </div>
  );
};
