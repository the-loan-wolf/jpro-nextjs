export default function user({params}) {
  const { id } = params;
  return (
    <p>user {id} resume</p>
  );
}
