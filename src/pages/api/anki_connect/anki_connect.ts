import { type AnkiConnectResponse } from "@/utils/types";

import { useEffect } from "react";

const EXPECTED_NUM_FIELDS = 2;
const ANKI_CONNECT_SERVER_URL = "http://127.0.0.1:8765";

async function invoke(
  action: string,
  params: Record<string, unknown> = {},
  version = 6
) {
  try {
    const response = await fetch(ANKI_CONNECT_SERVER_URL, {
      method: "POST",
      body: JSON.stringify({ action, version, params }),
    });
    if (!response.ok) {
      throw new Error("Failed to issue request.");
    }

    const data = (await response.json()) as AnkiConnectResponse;

    const numFields = Object.getOwnPropertyNames(data).length;
    if (numFields !== EXPECTED_NUM_FIELDS) {
      throw new Error(
        `Response has ${numFields} fields, expected ${EXPECTED_NUM_FIELDS}`
      );
    }

    if (!data.hasOwnProperty("error")) {
      throw new Error("Response is missing required error field");
    }

    if (!data.hasOwnProperty("result")) {
      throw new Error("Response is missing required result field");
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data.result;
  } catch (e) {
    if (e instanceof Error) {
      handleInvokeError(e);
    } else {
      console.error("Unkown Error: ", e);
    }
  }

  function handleInvokeError(e: Error) {
    if (e instanceof TypeError && e.message === "Failed to fetch") {
      alert(
        "Could not connect to Anki. Makes shure it is open and that AnkiConnect is installed."
      );
    } else if (e.message === "AnkiConnect permission denied") {
      // The app has no permission
      // Handle the error (e.g., display an error message to the user)
    } else {
      // Handle any other errors (e.g., log the error)
    }
  }
}

async function connectToAnki() {
  const result = await invoke("deckNames");
  console.log("got list of decks: ", result);
  // Ask user for permission to update configuration
  // const userResponse = confirm(
  //   "This action will update your AnkiConnect configuration to allow cross-origin requests from our web application. Do you want to continue?"
  // );
  // if (!userResponse) {
  //   return;
  // }

  // Request permission from AnkiConnect API
  // const permissionResponse = await invoke("requestPermission");
  // if (permissionResponse == "denied") {
  //   throw new Error("AnkiConnect permission denied");
  // }
}

export function useConnectToAnki() {
  useEffect(() => {
    try {
      void connectToAnki();
    } catch (e) {
      console.error("useConnectToAnkiError: ", e);
    }
  }, []);
}
