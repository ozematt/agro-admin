import { Dashboard } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const PanelPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      <Dashboard />
    </>
  );
};

export default PanelPage;
