'use client'
import { signOut } from 'next-auth/react'

export default function LogoutBtn() {
    return (
        <button onClick={()=>{
        signOut()
        }}><span>LOGOUT</span></button>
    )
}