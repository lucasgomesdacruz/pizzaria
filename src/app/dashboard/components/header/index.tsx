"use client"
import styles from "./styles.module.scss"
import Link from "next/link"
import Image from "next/image"
import logoImg from "/public/logo.svg"
import { LogOutIcon } from "lucide-react"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"

export function Header() {
    const router = useRouter();

    async function handleLogout() {
        deleteCookie("session", { path: "/"} )

        router.replace("/")
    }

    return (
        <header className={styles.container}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image 
                        alt="Logo da pizzaria"
                        src={logoImg}
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>

                    <Link href="/dashboard/product">
                        Produto
                    </Link>

                    <form action={handleLogout}>
                        <button type="submit">
                            <LogOutIcon size={24} color="#fff" />
                        </button>
                    </form>
                </nav>
                
            </div>
            
        </header>
    )
}