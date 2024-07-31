"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     try {
    //         setLoading(true);
    //         console.log("got login");
            
    //         const res = await signIn("credentials", {
    //             redirect: false,
    //             email: user.email,
    //             password: user.password,
    //         });
    //         console.log("4 login");
    //         if (res?.error) {
    //             toast.error(res.error);
    //         } else {
    //             console.log("==================================================================================================");
                
    //             toast.success("Login success");
    //             console.log("Success");
                
    //             // router.push(`/dashboard/${user.email}`);
    //         }
    //     } catch (error: any) {
    //         console.log("Login failed", error.message);
    //         toast.error("Login failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const onLogin = async (event: any) => {
        event.preventDefault();
        try {
            setLoading(true);
            // const response = await axios.post("/api/users/login", user);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            // router.push("/dashboard");
            console.log(response);

            const userName = response.data.name; 
            router.push(`/dashboard/${userName}`);
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-4">
                    Welcome to <span className="text-purple-600">Workflo</span>!
                </h1>
                <form className="space-y-4" onSubmit={onLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Your email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Your email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            disabled={buttonDisabled}
                        >
                            {loading ? "Processing..." : "Login"}
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Not have an account?{" "}
                    <Link href="/signup" className="text-purple-600 hover:text-purple-500">
                        Create new account.
                    </Link>
                </p>
            </div>
        </div>
    );
}
