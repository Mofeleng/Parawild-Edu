
export default function FormSuccessMessage({ onClick }: { onClick: () => void}) {
    return (
        <div className="bg-green-400 text-white p-4 rounded-md cursor-pointer" onClick={onClick}>
            <div>Thank you! Your submission has been received!</div>
        </div>
    )
}