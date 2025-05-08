import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import BoardListSkeleton from "@/components/board-list-skeleton";
import { Suspense } from "react";
import BoardList from "@/components/board-list";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: "Kanban Board",
  description: "A task management web app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={plusJakartaSans.variable}
      suppressHydrationWarning
    >
      <body className="bg-light-grey-light-bg dark:bg-very-dark-grey-dark-bg">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen overflow-hidden transition-all duration-300">
            <Sidebar>
              <Suspense fallback={<BoardListSkeleton />}>
                <BoardList />
              </Suspense>
            </Sidebar>

            <div
              data-sidebar-container
              className="flex flex-1 flex-col overflow-auto transition-[padding] duration-300 tablet:pl-[300px] data-[sidebar-hidden=true]:pl-0"
            >
              <Header>
                <Suspense fallback={<BoardListSkeleton />}>
                  <BoardList />
                </Suspense>
              </Header>
              <main className="flex-1 overflow-auto flex flex-col">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
