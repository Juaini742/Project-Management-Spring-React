

export default function AuthTemplate({children}: {children: React.ReactNode}) {
    return (
        <div className="max-h-screen h-screen w-full flex flex-col justify-center items-center">
            {children}
        </div>
    )
}