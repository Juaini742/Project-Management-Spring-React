export default function EmptyInbox() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-full">
            <div className="flex flex-col gap-4 items-center justify-center">
                <img src="/assets/empty-inbox.png" alt="empty inbox" className="w-1/2"/>
                <span className="text-mutedColor-1 text-sm">You don't choice any messages yet</span>
            </div>
        </div>
    );
}