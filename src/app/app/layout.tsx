import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "../providers";
import { headers } from "next/headers";
import DefaultLayout from "@/layouts/DefaultLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

const plainTemplateUrls = [
  "/auth/sign-in",
]

export default async function RootLayout({ children }: PropsWithChildren) {

  // Return plane template if Login page or Register page
  const headerList = await headers();
  const currentUrl = headerList.get("x-url") || headerList.get("referer");
  const url = URL.canParse(currentUrl || "") && new URL(currentUrl || "");
  
  if (url && plainTemplateUrls.includes(url.pathname)) {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    )
  }

  // Return Dashboard Layout
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />

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
