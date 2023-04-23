import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

import { type NextPage } from "next";
import { useState } from "react";
import { invoke } from "./api/anki_connect/anki_connect";

type FormData = {
  title: string;
  number_of_bars: number;
};

const handleSubmit = async (formData: FormData) => {
  toast(
    `Title: ${formData.title} \n Number of bars: ${formData.number_of_bars}`
  );

  try {
    await invoke("createDeck", {
      deck: formData.title,
    });
    toast(`Deck ${formData.title} created or already existed`);
  } catch {
    toast(`Something went wrong`);
  }

  const cards = Array.from(
    { length: formData.number_of_bars - 1 },
    (_, i) => `Takt ${i + 1}-${i + 2}`
  );

  try {
    for (const card of cards) {
      try {
        await invoke("addNote", {
          note: {
            deckName: formData.title,
            modelName: "Basic",
            fields: { Front: card, Back: "" },
          },
        });
      } catch (e) {
        toast(`Failed to add card with the description: ${card}`);
        throw e;
      }
    }
    toast(
      `Succesfully Added ${cards.length} cards to the Deck ${formData.title}`
    );
  } catch (e) {
    if (e instanceof Error) toast(e.message);
  }
};

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    number_of_bars: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(formData).catch((error: Error) => {
      toast(`Submit failed with error: ${error.message}`);
    });
  };

  return (
    <>
      <Toaster />
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
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 gap-y-8"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-white"
              >
                Deck Title
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-96 rounded-md border-0 py-1.5 text-gray-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Klavier: Fly me to the Moon - Jonny May (Advanced)"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="number_of_bars"
                className="block text-sm font-medium leading-6 text-white"
              >
                Number of bars
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="number"
                  name="number_of_bars"
                  value={formData.number_of_bars}
                  onChange={handleInputChange}
                  id="number_of_bars"
                  className="block w-16 rounded-md border-0 py-1.5 text-gray-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="seperate_hands"
                  name="seperate_hands"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="seperate_hands"
                  className="font-medium text-white"
                >
                  Seperate Hands
                </label>
                <p className="text-gray-400">
                  At first you will learn the bars with seperate hands.
                </p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="single_bars"
                  name="single_bars"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="single_bars" className="font-medium text-white">
                  Single Bars
                </label>
                <p className="text-gray-400">
                  At first you will learn single bars and then in conjunction.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Generate Deck
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;

// export function getServerSideProps() {
//   // fetch data from API or database
//   connectToAnki();

//   // return data as props
//   return {
//     props: {},
//   };
// }
