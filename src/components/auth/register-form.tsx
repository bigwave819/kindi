import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

// -------------------------
// Zod schema for signup
// -------------------------
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Minimum is 8 characters").max(128, "Maximum is 128 characters"),
  confirmPassword: z.string().min(8, "Minimum is 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type SignupFormProps = z.infer<typeof signupSchema>;

function SignupForm() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormProps>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormProps) => {
    setLoading(true);
    try {
      const res = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (res.error) {
        alert(res.error.message);
      } else {
        alert("Signup successful!");
        redirect("/");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (error) {
      console.error(error);
      alert("Google signup failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2">
          <Label className="font-semibold">Full Name *</Label>
          <Input
            {...register("name")}
            className="bg-slate-50 outline-none"
            placeholder="Enter Your Name"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2">
          <Label className="font-semibold">Password *</Label>
          <Input
            {...register("password")}
            className="bg-slate-50 outline-none"
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Confirm Password *</Label>
          <Input
            {...register("confirmPassword")}
            className="bg-slate-50 outline-none"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button className="w-full text-md font-semibold bg-[#6F4E37] hover:bg-[#523623] cursor-pointer">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-2 text-sm text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google signup button */}
      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-2 py-2 text-md bg-[#d8cdc5] rounded-full cursor-pointer hover:bg-[#c7bdb6] font-semibold"
      >
        <FcGoogle size={22} />
        Sign up with Google
      </button>
    </div>
  );
}

export default SignupForm;
