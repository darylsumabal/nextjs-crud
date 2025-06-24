import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";
import { HomeIcon, LogInIcon, LogOutIcon, Sprout } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";

const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              🌱 PlantCRUD
            </Link>
          </div>

          {/* {userProfile?.name && (
            <span className="text-[14px] text-gray-600 dark:text-gray-300">
              {`Hello, ${userProfile?.name.split(" ")[0]}`}
            </span>
          )} */}

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plant</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle />

            {user ? (
              <>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOutIcon className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </Link>
                </Button>
                <UserButton />
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogInIcon className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
