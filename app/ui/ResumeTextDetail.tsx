type ResumeTextDetailProps = {
    keyName: string;
    value: string;
}

export default function ResumeTextDetail({keyName, value}: ResumeTextDetailProps){
    return (
        <div className="flex justify-between px-10">
            <p>{keyName}</p>
            <p>{value}</p>
        </div>
    )
}