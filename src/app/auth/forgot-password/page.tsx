'use client'

import { Button, Group, Stepper } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import OtpForm from "@/app/components/authComponents/otpForm";
import ForgotPasswordForm from "@/app/components/authComponents/forgotPasswordForm";




export default function ForgotPassword() {
    

   const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));



    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
        <Stepper active={active} onStepClick={setActive} className='w-[70vw] h-[70vh]'>
                <Stepper.Step label="First step" description="Fill your email">
                    <OtpForm nextStep={nextStep}/>
                    <Button onClick={nextStep}>Next</Button>
                </Stepper.Step>

                <Stepper.Step
                    label="Final step"
                    description="Create Account"
                    icon={<ShieldCheck />}
                >
            
        <ForgotPasswordForm />
                    <Group justify="center" mt="xl">
                        <Button variant="default" onClick={prevStep}>Back</Button>
                    </Group>
                </Stepper.Step>
                <Stepper.Completed>
                    <h1>you can now login</h1>
                    <Link href="/auth/login">Login</Link>
                </Stepper.Completed>
            </Stepper>
            </div>
    )
}