"use server"

import { createSession } from "@/app/lib/session"
import { redirect } from "next/navigation"

const backend_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function sendOtp(email: string) {
    try {
        const response = await fetch(`${backend_url}api/auth/send-otp`, {
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
        const response = await fetch(`${backend_url}api/auth/signup`, {
            method: "POST",
            body: JSON.stringify({ email, otp, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok) return true
        else{ return "couldn't sign up make sure your registered!" }
    } catch (error) {
        return "couldn't sign up make sure your registered!"
    }
    
}


export async function signIn({ email, password }: {email: string, password: string}) {
    const response = await fetch(`${backend_url}api/auth/signin`, {
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
            
            redirect(`/employee/employee-dashboard/${data.id}`)
        }
        

        
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

export async function forgotPassword({email, otp, password}:{email:string, otp:string, password: string}){
    const response = await fetch(`${backend_url}api/auth/forgot-password`, {
        method: "POST",
        body: JSON.stringify({ email, otp, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
        return true;
    } 
    else {
        return "An error occurred!";
    }

}