import MainTemplate from "@/components/template/MainTemplate.tsx";
import {Outlet} from "react-router-dom";


export default function OverviewPage() {
    return (
        <MainTemplate>
            <div className="flex gap-5 h-full flex-1">
                <div className="flex-1 h-full">
                    <Outlet/>
                </div>
            </div>
        </MainTemplate>
    );
}