import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { PropsWithChildren } from "react";
import { Providers } from "../providers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../api/auth/[...nextauth]/authOptions";

export default async function RootLayout({ children }: PropsWithChildren) {

  const userSession = await getServerSession(authOption);

  if (!userSession) {
    redirect('/auth/sign-in');
  }

  // Return Dashboard Layout
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header
                session={userSession}
              />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
