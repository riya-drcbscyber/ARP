import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Login from "@/components/Login/page";

export const metadata: Metadata = {
  title:
    "Report System | Automated Report System",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Dboard() {
  return (
    <>
    <DefaultLayout>
        <ECommerce />
    </DefaultLayout>
    </>
  );
}
