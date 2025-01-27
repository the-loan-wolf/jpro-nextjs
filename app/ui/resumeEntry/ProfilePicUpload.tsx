import Image from "next/image";
export default function ProfilePicUpload(){
  return (
    <>
      {/* <!-- upload profile pic --> */}
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Image
          src="/image-profile.jpg"
          width={300}
          height={300}
          alt=""
          className="w-36 rounded-full md:rounded-2xl m-3"
        />
        <div className="flex flex-col">
          <input type="file" id="profilePic" />
          {/* <button
            className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
          >
            Upload Picture
          </button> */}
        </div>
      </div>
    </>
  );
};