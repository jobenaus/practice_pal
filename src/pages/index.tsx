import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

import { type NextPage } from "next";
import { useState } from "react";

type FormData = {
  title: string;
  number_of_bars: number;
};

const handleSubmit = (formData: FormData) => {
  toast(
    `Title: ${formData.title} \n Number of bars: ${formData.number_of_bars}`
  );

  const cards = Array.from(
    { length: formData.number_of_bars - 1 },
    (_, i) => `Takt ${i + 1}-${i + 2}`
  );

  console.log(cards);
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
    handleSubmit(formData);
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
          <form onSubmit={handleFormSubmit}>
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
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate Deck
              </button>
            </div>
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
