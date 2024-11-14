import Sidebar from "@/components/template/Sidebar.tsx";
import Header from "@/components/template/Header.tsx";
import {useState} from "react";


export default function MainTemplate({children}: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const toggle = () => setIsVisible(!isVisible);
    return (
        <div className="w-full h-screen flex overflow-clip">
                <Sidebar isVisible={isVisible} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isVisible ? 'ml-0' : '-ml-[200px]'}`}>
                <Header toggle={toggle}/>
                <main className="flex-1 overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}