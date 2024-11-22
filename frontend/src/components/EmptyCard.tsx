export default function EmptyCard({text}: { text: string }) {
    return (
        <div
            className="w-full mt-5 text-center bg-red-100 py-4 rounded-lg shadow text-red-600 dark:bg-red-900 dark:text-blue-200">
            {text}
        </div>
    )
}