import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const loginSchema = z.object({
    email: z.string().email("enter the valid email address"),
    password: z.string().min(8, 'minimun is eight characters').max(128, 'maximum is 128 characters')
})

type LoginFormProps = z.infer<typeof loginSchema>

function LoginForm() {

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({
        resolver: zodResolver(loginSchema)
    })

    const onsubmit = async (data: LoginFormProps) => {
        setLoading(true);
        try {
            const res = await signIn.email({
                email: data.email,
                password: data.password
            })

            if (res.error) {
                alert(res.error.message);
            } else {
                alert("login successfully")
                redirect("/")
            }
        } catch (error) {
            console.error(error);
            alert("login failed")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await signIn.social({
                provider: 'google',
                callbackURL: "/"
            })
        } catch (error) {
            console.error(error);
            alert('google login failed')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-3">
                <div className="space-y-5 mb-3">
                    <Label className="font-semibold">Email Address *</Label>
                    <Input
                        {...register("email")}
                        className="bg-slate-50 outline-none"
                        placeholder="Enter Your Email"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-4">
                    <Label className="font-semibold">Email Address *</Label>
                    <Input
                        {...register("password")}
                        className="bg-slate-50 outline-none"
                        placeholder="min characters 8"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>
                <Button className="w-full text-md font-semibold bg-[#6F4E37] hover:bg-[#523623] cursor-pointer">
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </form>
            {/* Divider */}
            <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-2 text-sm text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google login button */}
            <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 py-2 text-md bg-[#d8cdc5] rounded-full cursor-pointer hover:bg-[#c7bdb6] font-semibold"
            >
                <FcGoogle size={22} />
                Sign in with Google
            </button>
        </div>
    );
}

export default LoginForm;
