type ResumeTextDetailProps = {
    keyName: string;
    value: string;
}

export default function ResumeTextDetail({keyName, value}: ResumeTextDetailProps){
    return (
        <div className="flex flex-row justify-around">
            <p>{keyName}</p>
            <p>{value}</p>
        </div>
    )
}