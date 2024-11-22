import {useNavigate} from "react-router-dom";
import {useUser} from "@/hooks/useUser.ts";
import {useEffect} from "react";


export default function PublicRoute({element}: { element: React.ReactElement }) {
    const navigate = useNavigate();
    const {user, isLoading} = useUser()

    useEffect(() => {
        if (!isLoading && user) {
            navigate("/")
        }
    }, [isLoading, user, navigate]);

    return element
}
