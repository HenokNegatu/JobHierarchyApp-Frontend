'use client'

import { signUp } from "@/app/auth/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, {
        message: "Password must contain at least one letter, one number, and one special character"
    }),
});

type FormData = z.infer<typeof formSchema>;


export default function SignUpForm(prevStep: { prevStep: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        const response = await signUp(data)

        if (response === true) {
            notifications.show({
                title: 'SignUp',
                message: ` successfully signed up.`,
                color: 'green',
            });
            return redirect('/auth/signin')
        }
        notifications.show({
            title: 'Error',
            message: `${response}. Please try again.`,
            color: 'red',
        });


    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend="Create Account" className='flex flex-col items-start justify-center gap-2'>
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
                    label="Password"
                    description="Use at least 8 characters with a mix of letters, numbers & symbols."
                    placeholder="Secure password"
                    {...register("password")}
                    error={errors.password?.message}
                />
                <Button type="submit">Create Account</Button>
            </Fieldset>
        </form>
    )
}