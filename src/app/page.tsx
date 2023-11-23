import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";

//Server component used to render initial client homepage
export default async function Home() {
  //Obtaining userID from clerk authentication and transforming it to a boolean
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold"> ChatRAG </h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && 
            <Link href='/chat/1'>
              <Button> Go to Chats 
              </Button>
            </Link>}
            <div className="ml-2">
              <SubscriptionButton isPro={isPro}/>
            </div>
          </div>

          <p className="max-w-xl text-lg mt-1 text-slate-600">
            Let AI read your PDFs for you!
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
