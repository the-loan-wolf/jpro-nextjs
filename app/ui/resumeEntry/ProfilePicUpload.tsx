import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { uploadPic } from "@/app/utils/firebase-fn";
import { profilePicUrl } from "@/app/utils/globalStates";
import { useAtom, useSetAtom } from "jotai";
import CropperComponent from "@/app/ui/CropperComponent";
import { colors } from "@mui/material";

export default function ProfilePicUpload() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [url, setUrl] = useAtom(profilePicUrl);
  const [isUploaded, setIsUploaded] = useState(false);
  const picInput = useRef<null | HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCropDone = (croppedFile: File) => {
    const url = URL.createObjectURL(croppedFile);
    setCroppedImage(croppedFile);
    setUrl(url);
  };

  const clickHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const picFile = croppedImage;
    if (picFile) {
      const url = await uploadPic(picFile);
      if (!(url === "error")) {
        setUrl(url);
        setIsUploaded(true);
      }
    } else {
      console.warn("No file selected");
      alert("No file selected");
    }
  };

  return (
    <>
      {/* <!-- upload profile pic --> */}
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center">
        <Image
          // src="/image-profile.jpg"
          src={url || "/image-profile.jpg"}
          width={300}
          height={300}
          alt="profile picture"
          className="w-36 rounded-full md:rounded-2xl m-3"
        />
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            id="profilePic"
            ref={picInput}
            onChange={handleFileChange}
            className="hidden"
            onClick={()=>setCroppedImage(null)}
          />
          <label
            htmlFor="profilePic"
            className="inline-block p-1 bg-blue-500 text-white cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded"
          >
            Choose File
          </label>
          {imageSrc && !croppedImage && (
            <CropperComponent imageSrc={imageSrc} onCropDone={handleCropDone} />
          )}
          <button
            onClick={clickHandler}
            className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
          >
            Upload Picture
          </button>
          {isUploaded && (
            <p className="text-xs text-red-600">
              Click &quot;Save Data&quot; Button in the bottom to save Pic
            </p>
          )}
        </div>
      </div>
    </>
  );
}
