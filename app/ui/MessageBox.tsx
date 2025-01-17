export default function MessageBox({ message }: { message: string }) {
  return (
    <div
      className={`${
        message ? "block" : "hidden"
      } bg-orange-600 text-white p-1 text-center border-0 m-1 mb-3 rounded`}
    >
      {message}
    </div>
  );
}
