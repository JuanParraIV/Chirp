import { type NextPage } from "next";
import Head from "next/head";

import { useUser } from "@clerk/nextjs";

const ProfilePage: NextPage = () => {

  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen">
        <div>
          Profile View
          {user?.lastName}
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
