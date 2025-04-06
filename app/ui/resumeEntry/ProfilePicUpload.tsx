import Image from "next/image";
import { useRef } from "react";
import { uploadPic } from "@/app/utils/firebase-fn";
import { profilePicUrl } from "@/app/utils/globalStates";
import { useAtom, useSetAtom } from "jotai";

export default function ProfilePicUpload() {
  const [url, setUrl] = useAtom(profilePicUrl);
  const picInput = useRef<null | HTMLInputElement>(null);
  const clickHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const picFile = picInput.current?.files?.[0];
    // console.log(picFile?.name)
    if (picFile) {
      const url = await uploadPic(picFile);
      if (!(url === "error")) {
        setUrl(url);
      }
    } else {
      console.warn("No file selected");
      alert("No file selected");
    }
  };
  console.log("setUrl value: ", url)
  return (
    <>
      {/* <!-- upload profile pic --> */}
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Image
          // src="/image-profile.jpg"
          src={url || "/image-profile.jpg"}
          width={300}
          height={300}
          alt=""
          className="w-36 rounded-full md:rounded-2xl m-3"
        />
        <div className="flex flex-col">
          <input type="file" id="profilePic" ref={picInput} />
          <button
            onClick={clickHandler}
            className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
          >
            Upload Picture
          </button>
        </div>
      </div>
    </>
  );
}
