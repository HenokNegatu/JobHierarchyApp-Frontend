'use client'

import { sendOtp } from "@/app/auth/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;


export default function OtpForm(nextStep: { nextStep: () => void }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {

        const response = await sendOtp(data.email)

        if (response !== true) {
            return notifications.show({
                title: 'Error',
                message: `${response}. Please try again.`,
                color: 'red',
            });
        }

        return notifications.show({
            title: 'OTP',
            message: ` OTP sent check your email.`,
            color: 'green',
        });


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend="Please Fill your email" className='flex flex-col items-start justify-center gap-2'>
                <TextInput
                    label="Email"
                    className='w-[40vw]'
                    description="We'll send a one-time password to this email address."
                    {...register("email")}
                    error={errors.email?.message}

                />
                <p className="text-sm text-yellow-600 mt-2">
                    <strong>Warning:</strong> The OTP will expire after 5 minutes.
                </p>
                <Button type="submit">Send OTP</Button>
            </Fieldset>
        </form>
    )
}
