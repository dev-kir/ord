"use client";

import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <span className="text-2xl font-semibold dark:text-white">
            😶 ord.amirmuz.com
          </span>
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/count" className="hover:underline">
            Word Count
          </Link>
          <Link to="/sentiment" className="hover:underline">
            Sentiment
          </Link>
        </div>

        {/* Mobile dropdown menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/count">Word Count</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/sentiment">Sentiment</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <hr className="max-w-7xl mx-auto" />
    </nav>
  );
}

export default Navbar;
