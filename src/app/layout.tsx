import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dotto – Premium brandable domains, escrow-backed",
  description:
    "Discover curated brandable domains. Buy instantly, use escrow, or start a payment plan. Full refund if transfer doesn’t complete.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b border-[--color-border]">
            <div className="container-px container-max flex items-center gap-4 h-16">
              <Link href="/" className="font-semibold text-[20px] tracking-tight">Dotto</Link>
              <div className="ml-auto flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="relative w-[min(520px,60vw)]">
                    <input
                      type="search"
                      placeholder="Search by idea or keyword"
                      className="w-full h-10 rounded-full border bg-[--color-card] pl-10 pr-4 text-sm placeholder:text-[--color-muted-foreground] focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
                      aria-label="Search by idea or keyword"
                    />
                    <svg aria-hidden viewBox="0 0 20 20" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--color-muted-foreground]">
                      <path fill="currentColor" d="M12.9 14.32a8 8 0 1 1 1.414-1.414l3.386 3.387-1.414 1.414-3.386-3.387ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z" />
                    </svg>
                  </div>
                </div>
                <Link href="/auth" className="hidden sm:inline-flex items-center h-10 px-4 rounded-full bg-[--color-primary] text-[--color-primary-foreground] text-sm font-medium shadow-[--shadow-soft] hover:opacity-90">Sign in</Link>
                <Link href="/auth" className="inline-flex items-center h-10 px-4 rounded-full border bg-[--color-card] text-sm font-medium hover:bg-[--color-muted]">Sign up</Link>
                <Link href="/dashboard" className="inline-flex items-center h-10 px-4 rounded-full border border-[--color-border] bg-[--color-card] text-sm font-medium hover:bg-[--color-muted]">Dashboard</Link>
              </div>
            </div>
            <div className="border-t border-[--color-border] bg-[--color-muted] text-[12px] text-[--color-muted-foreground]">
              <div className="container-px container-max py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>Escrow</span>
                  <span>Refund Guarantee</span>
                  <span>Secure Checkout</span>
                </div>
                <span className="text-[--color-foreground] font-medium">Full refund if transfer doesn’t complete.</span>
              </div>
            </div>
          </header>

          <main className="flex-1 container-px container-max">{children}</main>

          <footer className="mt-12 border-t border-[--color-border] bg-[--color-muted]">
            <div className="container-px container-max py-10 grid gap-6 sm:grid-cols-3 text-sm">
              <div>
                <div className="font-semibold mb-2">Why Dotto</div>
                <p className="text-[--color-muted-foreground]">We hold funds in escrow until you confirm control. Full refund if the transfer doesn’t complete.</p>
              </div>
              <div>
                <div className="font-semibold mb-2">Guides</div>
                <ul className="text-[--color-muted-foreground] space-y-1">
                  <li><Link href="/escrow">Escrow process</Link></li>
                  <li><Link href="/guarantee">Refund Guarantee</Link></li>
                  <li><Link href="/transfer">Transfer guide</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">Legal</div>
                <ul className="text-[--color-muted-foreground] space-y-1">
                  <li><Link href="/terms">Terms</Link></li>
                  <li><Link href="/privacy">Privacy</Link></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
