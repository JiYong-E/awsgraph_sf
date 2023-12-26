import Link from "next/link";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { useEffect, useState } from "react";

export default function Layout({ children }) {

    const [data, setData] = useState(null);

    useEffect(() => {
        // https://realnext-git-main-jiyong-es-projects.vercel.app/
        // fetch('http://localhost:3000/api/components/GetSession') 
        fetch('https://awsgraph.vercel.app/api/components/GetSession')
        .then(res => res.json())
        .then(data => {
            setData(data);
        })
        .catch(error => { 
            console.error('Error fetching data:', error);
        });
    }, []);



    return (
        <div id="layout">
            <div id="navbar">
                <Link href={'/'} id="specialHome"><button>HOME</button></Link>

                <div id='loginbar'>
                    <span id='loginbarText'>{data?.collection?.name ? data?.collection?.name + '님 어세오세요' : '로그인 해주세요'}</span>
                    <LoginBtn />
                    <LogoutBtn />
                </div>
            </div>
            {children}
        </div>
    )
}
