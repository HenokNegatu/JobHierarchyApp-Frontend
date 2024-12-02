"use server"

import { createSession } from "@/app/lib/session"
import { redirect } from "next/navigation"



export async function sendOtp(email: string) {
    try {
        const response = await fetch("http://localhost:3000/api/auth/send-otp", {
            method: "POST",
            body: JSON.stringify({email:email}),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.status === 201){
            return true
        }
    } catch (error) {
        return "failed to send mail!"
    }
    
}

export async function signUp({ email, otp, password }: {email: string, otp: string, password: string}) {
    try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, otp, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        return true
    } catch (error) {
        return "couldn't sign up make sure your registered!"
    }
    
}


export async function signIn({ email, password }: {email: string, password: string}) {
    const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 201) {
        const data = await response.json();
        await createSession({
            user:{
                id: data.id,
                role: data.role
            },
            accessToken: data.accessToken
        })

        if(data.employeeRole === "admin"){
            redirect('/')
        }
        else{
            redirect(`/employee-dashboard/${data.id}`)
        }
        

        return data;
    } else if (response.status === 409) {
        return "Couldn't sign in. Make sure you sign up first!";
    } 
    else if (response.status === 401) {
        return "Invalid credentials!";
    } 
    
    else {
        // Handle other status codes
        console.error(`Unexpected status code: ${response.status}`);
        return "An error occurred!";
    }
    
}
