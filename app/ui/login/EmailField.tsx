export default function EmailField({setEmail, email}: {setEmail: (value: string)=> void, email: string}) {
  return (
    <div className="relative py-5 px-0">
      <i className="fas fa-envelope absolute text-black"></i>
      <input
        type="email"
        id="email"
        placeholder="Email"
        required
        className="peer/recovery text-black w-full bg-transparent border-b-2 border-slate-400 pl-6 text-sm focus:bg-transparent focus:outline-transparent focus:border-b-2 focus:border-red-950 placeholder:text-transparent outline-none"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label
        htmlFor="email"
        className="absolute text-sm left-6 top-1 text-gray-500 transition-all duration-300 transform -translate-y-1/2 peer-placeholder-shown/recovery:top-7 peer-placeholder-shown/recovery:left-6 peer-placeholder-shown/recovery:text-base peer-placeholder-shown/recovery:text-gray-400 peer-focus/recovery:top-1 peer-focus/recovery:left-6 peer-focus/recovery:text-sm peer-focus/recovery:text-red-950"
      >
        Email
      </label>
    </div>
  );
}
