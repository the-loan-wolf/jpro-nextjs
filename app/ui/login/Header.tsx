export default function Header({ heading }: { heading: string }){
    return(
        <h1 className="text-2xl text-slate-900 font-bold text-center p-5 mb-2">{heading}</h1>
    )
}