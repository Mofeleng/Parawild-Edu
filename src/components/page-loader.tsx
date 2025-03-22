
export default function PageLoader() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary" aria-label="Loading..." role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}