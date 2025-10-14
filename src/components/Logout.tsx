"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";

type Props = {
  mobile?: boolean;
};

const Logout = ({ mobile }: Props) => {
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <form>
      <button
        onClick={logout}
        className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-slate-300 ${
          mobile ? "hover:bg-blue-100" : "hover:bg-slate-800"
        } `}
      >
        <LogOut />
        Wyloguj
      </button>
    </form>
  );
};

export default Logout;
