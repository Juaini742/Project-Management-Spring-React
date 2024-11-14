import {createBrowserRouter} from "react-router-dom";
import OverviewPage from "@/pages/overview/OverviewPage.tsx";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";
import ProjectPage from "@/pages/project/ProjectPage.tsx";
import RegisterPage from "@/pages/register/RegisterPage.tsx";
import OverviewInbox from "@/pages/overview/inbox/OverviewInbox.tsx";
import OverviewSent from "@/pages/overview/sent/OverviewSent.tsx";
import OverviewGroup from "@/pages/overview/group/OverviewGroup.tsx";
import RightContent from "@/pages/overview/inbox/RightContent.tsx";
import EmptyInbox from "@/pages/overview/inbox/EmptyInbox.tsx";
import LoginPage from "@/pages/login/LoginPage.tsx";
import PublicRoute from "@/router/PublicRoute.tsx";
import SecuredRoute from "@/router/SecuredRoute.tsx";
import DashboardPage from "@/pages/dashboard/DashboardPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SecuredRoute element={<DashboardPage/>}/>,
    },
    {
        path: '/overview',
        element: <SecuredRoute element={<OverviewPage/>}/>,
        children: [
            {
                index: true,
                element: <SecuredRoute element={<OverviewInbox/>}/>,
            },
            {
                path: 'inbox',
                element: <SecuredRoute element={<OverviewInbox/>}/>,
                children: [
                    {
                        index: true,
                        element: <SecuredRoute element={<EmptyInbox/>}/>,
                    },
                    {
                        path: ":id",
                        element: <SecuredRoute element={<RightContent/>}/>,
                    }
                ]
            },
            {
                path: 'sent',
                element: <SecuredRoute element={<OverviewSent/>}/>,
            },
            {
                path: 'group',
                element: <SecuredRoute element={<OverviewGroup/>}/>,
            },
        ]
    },
    {
        path: '/profile',
        element: <SecuredRoute element={<ProfilePage/>}/>,
    },
    {
        path: '/project',
        element: <SecuredRoute element={<ProjectPage/>}/>,
    },
    {
        path: '/login',
        element: <PublicRoute element={<LoginPage/>}/>,
    },
    {
        path: '/register',
        element: <PublicRoute element={<RegisterPage/>}/>,
    },
])