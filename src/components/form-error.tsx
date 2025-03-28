
export default function FormErrorMessage({ onClick }:{ onClick: () => void}) {
    return (
        <div className="bg-red-400 text-white p-4 rounded-md cursor-pointer mt-10" onClick={onClick}>
            <div>Something went wrong. Please contact pienaarmarkus007@gmail.com if error persists</div>
        </div>
    )
}