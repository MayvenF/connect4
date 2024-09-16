import Link from "next/link";

export default function Menu(){
    return(
        <div className="topnav">
            <Link href="/">Welcome</Link>
            <Link href="/connect4">Connect4</Link>
        </div>
    )
}