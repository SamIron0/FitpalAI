/*import { redirect } from "next/navigation";
import { getSession } from "#/app/supabase-server";
import { useUser } from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getURL } from "#/utils/helpers";
*/
import AuthUI from "./AuthUI";

export default async function SignIn() {
  /*const session = await getSession();
  if (session) {
    //const user = session?.user;
    return redirect("/");

    //redirect(`https://plan.fitpalai.com`);
  }
*/
  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <img src="/logo.svg" alt="logo" className="h-[160px] mb-2 "></img>
        </div>
        <div className="flex flex-col space-y-4">
          <AuthUI />
        </div>
      </div>
    </div>
  );
}
