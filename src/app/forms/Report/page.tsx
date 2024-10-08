import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReportType from "@/components/FormElements/ReportType/page";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
const adverseForm  = () => {
  return (
    <DefaultLayout>
      <ReportType />
    </DefaultLayout>
  );
};
export default adverseForm;
