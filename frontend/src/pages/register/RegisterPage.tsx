import RegisterForm from "@/pages/register/RegisterForm.tsx";
import AuthTemplate from "@/components/template/AuthTemplate.tsx";


export default function RegisterPage() {
    return (
        <AuthTemplate>
            <div className="p-5 rounded shadow min-w-96">
                <h1 className="text-center mb-3 font-semibold">Register Page</h1>
                <RegisterForm/>
            </div>
        </AuthTemplate>
    );
};
