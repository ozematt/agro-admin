import { SectionCards } from "@/components/section-cards";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const PanelPage = async () => {
  return (
    <Suspense
      fallback={
        <div className="mx-auto my-auto">
          <Spinner className="size-8" />
        </div>
      }
    >
      <AuthCheckWrapper />
    </Suspense>
  );
};

export default PanelPage;

// NOTE: for cachComponents, coz async is in use
const AuthCheckWrapper = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="grid gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
    </div>
  );
};
