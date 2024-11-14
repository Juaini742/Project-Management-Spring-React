import EachElement from "@/components/EachElement.tsx";
import {Card} from "@/components/ui/card.tsx";


export default function PersonalMessage({messages}: { messages: any }) {

    console.log(messages)
    return (
        <>
            <EachElement
                of={messages?.messages}
                render={(item, i) => (
                    <>
                        <Card key={i} className={`p-3 w-[21rem] ${i % 2 === 0 ? "self-end" : ""}`}>
                            <p className="text-[10px]">{item.message}</p>
                        </Card>
                    </>
                )}/>
        </>
    )
}
