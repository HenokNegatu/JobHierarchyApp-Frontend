'use client'

import { signIn } from "@/app/auth/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

type FormData = z.infer<typeof formSchema>;


export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        const response = await signIn(data)

        if(response){
            return notifications.show({
                title: 'Error',
                message: `${response}. Please try again.`,
                color: 'red',
            });
        }


    };
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <Fieldset legend="Please Fill your credentials" className='flex flex-col items-start justify-center gap-2'>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <TextInput
                        label="Email"
                        className='w-[40vw]'
                        description="Enter your registered email."
                        {...register("email")}
                        error={errors.email?.message}
                    />
                    <PasswordInput
                        label="Password"
                        description="Use at least 8 characters with a mix of letters, numbers & symbols."
                        placeholder="Secure password"
                        {...register("password")}
                        error={errors.password?.message}
                    />
                    <Button type="submit">Signin</Button>
                    <div className="flex items-center justify-between">
                        <Link href="/auth/forgot-password" className="text-gray-500">forgot password?</Link>
                        <Link href="/auth/signup" className="underline">Signup</Link>
                    </div>
                </form>
            </Fieldset>
        </div>
    )
}