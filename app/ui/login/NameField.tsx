export default function NameField({
  setName,
  name,
  value,
}: {
  setName: (value: string) => void;
  name: string;
  value: string;
}) {
  return (
    <div className="relative py-5 px-0">
      <i className="fas fa-user fas fa-envelope absolute text-black"></i>
      <input
        type="text"
        id="lName"
        placeholder={name}
        required
        className="peer/signUpLname text-black w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={value}
      />
      <label
        htmlFor="lName"
        className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signUpLname:top-7 peer-placeholder-shown/signUpLname:left-6 peer-placeholder-shown/signUpLname:text-base peer-placeholder-shown/signUpLname:text-gray-400 peer-focus/signUpLname:top-1 peer-focus/signUpLname:left-6 peer-focus/signUpLname:text-sm peer-focus/signUpLname:text-red-950"
      >
        {name}
      </label>
    </div>
  );
}
