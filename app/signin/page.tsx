import { getSession } from "@/app/supabase-server";
import AuthUI from "./AuthUI";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex bg-black justify-center height-screen-helper">
      <div className="flex flex-col justify-between pt-3  max-w-lg p-3 m-auto w-80 ">
        <AuthUI />
      </div>
    </div>
  );
}
