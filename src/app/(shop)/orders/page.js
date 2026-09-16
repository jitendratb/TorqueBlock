import React from "react";
import OrdersClient from "../Components/Orders/OrdersClient";
import Breadcrumb from "@/components/atoms/BreadCrumb";
import orderService from "@/services/orderService";
import { cookies } from "next/headers";

export const metadata = {
    title: "My Orders",
    description: "Track and manage your tyre orders, check shipping status, and view past invoices.",
};

export default async function MyOrdersPage() {
    let initialOrders = [];

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("authToken")?.value;

        if (token) {
            initialOrders = await orderService.getOrderHistory(1, 10, undefined, undefined, { token });
        }
    } catch (error) {
        console.error("Error loading orders on server:", error);
    }

    console.log(initialOrders)

    return (
        <main className="">
            <Breadcrumb items={[{ label: "My Orders", href: "/orders" }]} />
            <OrdersClient initialOrders={initialOrders} />
        </main>
    );
}
