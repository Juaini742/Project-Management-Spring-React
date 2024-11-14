import {useUser} from "@/hooks/useUser.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LineWave} from "react-loader-spinner";
import AuthTemplate from "@/components/template/AuthTemplate.tsx";

export default function SecuredRoute({element}: { element: React.ReactElement }) {
    const navigate = useNavigate();
    const {user, isLoading} = useUser()

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login")
        }
    }, [isLoading, user, navigate]);

    if (isLoading) {
        return <AuthTemplate>
            <LineWave
                visible={true}
                height="200"
                width="200"
                color="#4338ca"
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
            />
        </AuthTemplate>;
    }

    return element
}
