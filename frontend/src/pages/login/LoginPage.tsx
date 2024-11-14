import AuthTemplate from "@/components/template/AuthTemplate.tsx";
import LoginForm from "@/pages/login/LoginForm.tsx";


export default function LoginPage() {
    return (
        <AuthTemplate>
            <div className="min-w-96 p-5 rounded shadow">
                <h1 className="text-center mb-3 font-semibold">Login Page</h1>
                <LoginForm/>
            </div>
        </AuthTemplate>
    );
};
