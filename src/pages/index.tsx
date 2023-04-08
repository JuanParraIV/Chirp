import { type NextPage } from "next";
import Head from "next/head";

import { SignIn, SignInButton, useUser } from "@clerk/nextjs";

import CreatePostWizard from "@/components/createPostWizard";
import Feed from "@/components/feed";


const Home: NextPage = () => {

  const { isSignedIn } = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen">
        <div className=" w-full md: max-w-2xl border-x border-slate-400 h-full">
          <div className="border-b border-slate-400 p-4 flex">
            {!isSignedIn ?
              <div className="flex justify-center">
                <SignInButton />
              </div>
              :
              null
            }
            {isSignedIn ?
              <CreatePostWizard />
              :
              null
            }
          </div>
          <Feed />
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </main>
    </>
  );
};

export default Home;
