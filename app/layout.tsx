import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="bg-light-grey-light-bg dark:bg-very-dark-grey-dark-bg">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden transition-all duration-300">
            <Sidebar />
            
            <div className="flex flex-1 flex-col overflow-auto">
              <Header />
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
