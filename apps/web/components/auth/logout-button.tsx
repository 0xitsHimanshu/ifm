"use client"

import { Button } from "@/components/ui/button"
import { authApi } from "@/lib/api-client"
import { LogOut } from "lucide-react";

export function LogoutButton({ isOpen }: { isOpen: boolean }) {
  const handleLogout = async () => {
    await authApi.logout();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="text-red-500 hover:text-red-600 hover:bg-none"
    >
      <LogOut className="h-4 w-4" />
      {
        isOpen ?  <span>Logout</span> : <span></span>
      }
    </Button>
  );
} 