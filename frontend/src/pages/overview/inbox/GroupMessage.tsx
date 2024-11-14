import EachElement from "@/components/EachElement.tsx";
import {Card} from "@/components/ui/card.tsx";


export default function GroupMessage({messages}: { messages: any }) {
    return (
        <>
            <EachElement
                of={messages?.messages}
                render={(item, i) => (
                    <>
                        <span className={`text-[11px] ${item.sender_name === "Alex" ? "self-end" : ""}`}>{item.sender_name}</span>
                        <Card key={i} className={`p-3 w-[21rem] ${item.sender_name === "Alex" ? "self-end" : ""}`}>
                            <p className="text-[10px] leading-6">{item.message}</p>
                        </Card>
                    </>
                )}/>
        </>
    )
}
