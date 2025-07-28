import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | WD Homes - Dashboard",
    default: "WD Homes - Dashboard",
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {

  // Return Dashboard Layout
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader color="#F9312F" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
