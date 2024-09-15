import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { bric, clashDisplay } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { Toast } from "@/components/ui/toast";
export const metadata: Metadata = {
  title: "Runner - Automation Tool",
  description: "A automation tool for your daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`${clashDisplay.variable} ${bric.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toast />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
