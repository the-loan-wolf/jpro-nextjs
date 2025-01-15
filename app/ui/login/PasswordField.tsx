export default function EmailField({
  setPassword,
  password,
}: {
  setPassword: (value: string) => void;
  password: string;
}) {
  return (
    <div className="relative py-5 px-0">
      <i className="fas fa-lock fas fa-envelope absolute text-black"></i>
      <input
        type="password"
        id="password"
        placeholder="Password"
        required
        className="peer/signInPass text-black w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <label
        htmlFor="password"
        className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/signInPass:top-7 peer-placeholder-shown/signInPass:left-6 peer-placeholder-shown/signInPass:text-base peer-placeholder-shown/signInPass:text-gray-400 peer-focus/signInPass:top-1 peer-focus/signInPass:left-6 peer-focus/signInPass:text-sm peer-focus/signInPass:text-red-950"
      >
        Password
      </label>
    </div>
  );
}
