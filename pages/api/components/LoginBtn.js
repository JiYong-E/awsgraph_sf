'use client'
import { signIn } from 'next-auth/react'

export default function LoginBtn() {
    return (
        <button onClick={()=>{
        signIn()
        }}><span>LOGIN</span></button>
    )
}