import Link from "next/link"

export default function FetchError({ error }: { error:string}) {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-red-700">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
                <p className="text-muted-foreground">{error}</p>
                <div className="animate-bounce text-4xl">😕</div>
                <Link href="/">Go home </Link>
            </div>
        </div>
    )
}