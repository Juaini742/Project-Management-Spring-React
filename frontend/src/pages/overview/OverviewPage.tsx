import MainTemplate from "@/components/template/MainTemplate.tsx";
import OverviewSidebar from "@/pages/overview/OverviewSidebar.tsx";
import {Outlet} from "react-router-dom";


export default function OverviewPage() {
    return (
        <MainTemplate>
            <div className="flex gap-5 h-full flex-1">
                <div className="w-[10%] h-full">
                    <OverviewSidebar/>
                </div>
                <div className="flex-1 h-full">
                    <Outlet/>
                </div>
            </div>
        </MainTemplate>
    );
}