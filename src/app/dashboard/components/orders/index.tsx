"use client"

import styles from "./styles.module.scss"
import { RefreshCcw } from "lucide-react"
import { OrderProps } from "@/lib/order.type"
import { ModalOrder } from "../modal"
import { OrderContext } from "@/providers/order"
import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
    orders: OrderProps[]
}


export function Orders({ orders }: Props) {
    const { isOpen, onRequestOpen} = use(OrderContext)
    const route = useRouter()

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id)
    }

    function handleRefresh() {
        route.refresh()
        toast.success("Pedidos atualizado com sucesso!")
    }


    useEffect(() => {
        const interval = setInterval(() => {
            route.refresh()
            toast.success("Pedidos atualizados automaticamente!")
        }, 600000) // 15 minutos

        // Limpa o intervalo quando o componente desmontar
        return () => clearInterval(interval)
    }, [route])

    return (
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={handleRefresh}>
                        <RefreshCcw size={24} color="#3fffa3" />
                    </button>
                </section>

                <section className={styles.listOrders}>
                    {orders.length === 0 && ( 
                        <span className={styles.emptyItem}>
                            Nenhum pedido aberto no momento...
                        </span>
                    )}
                    {orders.map( order => (
                        <button
                        key={order.id}
                        className={styles.orderItem}
                        onClick={ () => handleDetailOrder(order.id)}
                        >
                            <div className={styles.tag}></div>
                            <span>Mesa {order.table}</span>
                        </button>
                    ))}
                </section>
            </main>

            { isOpen && <ModalOrder /> }
        </>
        
    )
}