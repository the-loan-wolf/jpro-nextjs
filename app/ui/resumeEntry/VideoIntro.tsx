import { useEffect, useState } from "react";
import InputFieldAddress from "./InputFieldAddress";
import { useAtomValue } from "jotai";
import { serverData } from "@/app/utils/globalStates";

export default function VideoIntro() {
  const [value, setValue] = useState("");
  const [verified, setVerified] = useState(false);
  const serverDataState = useAtomValue(serverData);

  useEffect(() => {
    if (serverDataState.vidIntro) {
      setValue(serverDataState.vidIntro);
    }
  }, [serverDataState]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClick = () => {
    isYouTubeVideoAvailable(value);
    console.log(value)
  };

  async function isYouTubeVideoAvailable(videoId: string) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    try {
      const res = await fetch(url);
      setVerified(res.ok);
      console.log(res);
      // return res.ok; // true if 200 OK, false if 404 Not Found
    } catch (err) {
      console.error("Error checking video:", err);
      return false;
    }
  }

  return (
    <div className="py-3 border-b-2">
      <InputFieldAddress
        id="vidIntro"
        labelName="Your youtube video link"
        value={value}
        inputHandler={inputHandler}
      />
      <button
        className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
        onClick={onClick}
        type="button"
      >
        {verified ? "Verified ✅" : "Verify link"}
      </button>
    </div>
  );
}
