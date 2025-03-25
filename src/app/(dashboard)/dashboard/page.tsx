"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Gift, PlayCircle, Tag } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();

  const modules = [
    {
      title: t("dashboard.content"),
      description: "Manage content, videos, and media",
      icon: <PlayCircle className="h-8 w-8 text-blue-500" />,
      href: "/dashboard/content",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t("dashboard.interests"),
      description: "Manage interest categories and targeting",
      icon: <Tag className="h-8 w-8 text-green-500" />,
      href: "/dashboard/interests",
      color: "from-green-500 to-green-600",
    },
    {
      title: t("dashboard.rewards"),
      description: "Manage rewards and user redemptions",
      icon: <Award className="h-8 w-8 text-purple-500" />,
      href: "/dashboard/rewards",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: t("dashboard.gems"),
      description: "Manage gems and releases",
      icon: <Gift className="h-8 w-8 text-amber-500" />,
      href: "/dashboard/gems",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("dashboard.title")}
        </h1>
        <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((module) => (
          <Link key={module.href} href={module.href}>
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className={`h-2 bg-gradient-to-r ${module.color}`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {module.title}
                </CardTitle>
                {module.icon}
              </CardHeader>
              <CardContent>
                <CardDescription>{module.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-md border p-4">
              <div className="rounded-full p-2 bg-blue-50 dark:bg-blue-900">
                <PlayCircle className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">New content added</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <div className="rounded-full p-2 bg-green-50 dark:bg-green-900">
                <Tag className="h-4 w-4 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Interest updated</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <div className="rounded-full p-2 bg-purple-50 dark:bg-purple-900">
                <Award className="h-4 w-4 text-purple-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Reward delivered</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/dashboard/content/new"
              className="flex items-center justify-between p-3 rounded-md bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              <span className="font-medium">Add New Content</span>
              <PlayCircle className="h-5 w-5 text-blue-500" />
            </Link>
            <Link
              href="/dashboard/interests/new"
              className="flex items-center justify-between p-3 rounded-md bg-green-50 dark:bg-green-900/50 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
            >
              <span className="font-medium">Create New Interest</span>
              <Tag className="h-5 w-5 text-green-500" />
            </Link>
            <Link
              href="/dashboard/rewards/manage"
              className="flex items-center justify-between p-3 rounded-md bg-purple-50 dark:bg-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            >
              <span className="font-medium">Manage Reward Requests</span>
              <Award className="h-5 w-5 text-purple-500" />
            </Link>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>System</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium">
                    Online
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full w-[98%] rounded-full bg-green-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Content Storage</span>
                  <span>68%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full w-[68%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Database</span>
                  <span>42%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full w-[42%] rounded-full bg-purple-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
