import MainTemplate from "@/components/template/MainTemplate.tsx";
import {useUser} from "@/hooks/useUser.tsx";

export default function DashboardPage() {
    const {user: data} = useUser()
    console.log(data)
    return (
        <MainTemplate>
            <div className="flex gap-5 h-full flex-1">
                <h1>Dashboard Page</h1>
            </div>
        </MainTemplate>
    );
}