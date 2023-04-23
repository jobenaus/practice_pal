import { type AnkiConnectResponse } from "@/utils/types";
import toast from "react-hot-toast";

const EXPECTED_NUM_FIELDS = 2;
const ANKI_CONNECT_SERVER_URL = "http://127.0.0.1:8765";

async function invoke(
  action: string,
  params: Record<string, unknown> = {},
  version = 6
) {
  const response = await fetch(ANKI_CONNECT_SERVER_URL, {
    method: "POST",
    body: JSON.stringify({ action, version, params }),
  });

  if (response.ok) {
    console.log("Response OK");
  } else console.log("Response not ok");

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
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
}

async function invokeWithErrors(
  action: string,
  params: Record<string, unknown> = {},
  version = 6
) {
  try {
    return await invoke(action, params, version);
  } catch (e) {
    console.error("Invoke Error ", e);
    if (e instanceof TypeError && e.message === "Failed to fetch") {
      try {
        const permissionResponse = await invoke("requestPermission");
        console.log("permission Response", permissionResponse);
      } catch (e) {
        console.error("Permission Response Error: ", e);
        console.log(
          "Anki muss gestartet werden oder AnkiConnect installiert werden"
        );
      }
    }
  }
}

export function connectToAnki() {
  const notify = () => toast("Here is your toast.");
  invokeWithErrors("deckNames")
    .then((result) => console.log("got list of decks: ", result))
    .catch((e) => {
      notify();
      console.error("Connect To Anki: ", e);
    });
}
