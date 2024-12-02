import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";

import { notifications } from "@mantine/notifications";
import { Fieldset } from "@mantine/core";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "@/app/auth/actions/auth";
import z from "zod"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

type FormData = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        error: ''
    })
    const onSubmit = async (data: FormData) => {

        if (data.password !== confirmPassword.value) {
            return setConfirmPassword({ value: confirmPassword.value, error: 'new Password and Confirm Password must match' })
        }

        const response = await forgotPassword(data)

        if (response === true) {
            return notifications.show({
                title: 'OTP',
                message: ` OTP sent check your email.`,
                color: 'green',
            });
        }
        return notifications.show({
            title: 'Error',
            message: `${response}. Please try again.`,
            color: 'red',
        });


    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend="Please Fill your credentials" className='flex flex-col items-start justify-center gap-2'>
                <TextInput
                    label="Email"
                    className='w-[40vw]'
                    description="Enter your registered email."
                    {...register("email")}
                    error={errors.email?.message}
                />
                <TextInput
                    label="OTP"
                    className='w-[40vw]'
                    description="Enter the 6-digit code sent to your email."
                    placeholder='******'
                    {...register("otp")}
                    error={errors.otp?.message}
                />
                <PasswordInput
                    label="New Password"
                    description="Use at least 8 characters with a mix of letters, numbers & symbols."
                    placeholder="Secure password"
                    {...register("password")}
                    error={errors.password?.message}
                />
                <PasswordInput
                    label="Confirm Password"
                    description="Use at least 8 characters with a mix of letters, numbers & symbols."
                    placeholder="Secure password"
                    value={confirmPassword.value}
                    onChange={(e) => setConfirmPassword({ value: e.target.value, error: '' })}
                    error={confirmPassword.error}
                />
                <Button type="submit">Reset</Button>
                <div className="flex items-center justify-between">
                    <Link href="/auth/signin" className="underline">Signin</Link>
                </div>
            </Fieldset>
        </form>
    )
}