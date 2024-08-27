import ECommerce2 from "@/components/Dashboard1/E-commerce2";
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
        <ECommerce2 />
    </DefaultLayout>
    </>
  );
}
