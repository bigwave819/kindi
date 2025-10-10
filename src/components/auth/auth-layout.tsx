'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

function AuthLayout() {
    const [active, setActive] = useState('login')
    return (
        <div className="items-center justify-center flex min-h-[100vh] mt-16 p-7">
            <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome to Kindi!</h1>
                <Tabs defaultValue={active} onValueChange={setActive} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full gap-2 p-1 bg-muted rounded-md">
                        <TabsTrigger 
                            value="login"
                            className="data-[state=active]:bg-[#6F4E37] data-[state=active]:text-white transition-colors rounded-md py-2 px-4 text-sm font-medium"
                        >
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger 
                            value="register"
                            className="data-[state=active]:bg-[#6F4E37] data-[state=active]:text-white transition-colors rounded-md py-2 px-4 text-sm font-medium"
                        >
                            Sign Up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default AuthLayout;