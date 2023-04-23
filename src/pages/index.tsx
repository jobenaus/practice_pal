import Head from "next/head";

import { connectToAnki } from "./api/anki_connect/anki_connect";

import { type NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Practice Pal</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Practice Pal
          </h1>
          <div>
            <button
              className="rounded-lg bg-indigo-300 p-5"
              onClick={connectToAnki}
            >
              Connect to Anki
            </button>
          </div>
          <div>
            <label
              htmlFor="deck-title"
              className="block text-sm font-medium leading-6 text-white"
            >
              Deck Title
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="deck-title"
                id="deck-title"
                className="block w-96 rounded-md border-0 py-1.5 text-gray-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Klavier: Fly me to the Moon - Jonny May (Advanced)"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="number-of-bars"
              className="block text-sm font-medium leading-6 text-white"
            >
              Number of bars
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="number-of-bars"
                id="number-of-bars"
                className="block w-16 rounded-md border-0 py-1.5 text-gray-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
