type Props = {
    Header: string;
}
export default function Header({Header}: Props){
  return (
    <h2 className="font-ebGaramond text-3xl font-bold text-white p-5">{Header}</h2>
  )
}