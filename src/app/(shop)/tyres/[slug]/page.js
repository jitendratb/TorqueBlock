import Breadcrumb from "@/components/atoms/BreadCrumb";
import tyresService from "@/services/tyresService";
import TyresClient from "../../Components/TyresClient";

async function Page({ params }) {
    const { slug } = await params;
    const tyre = await tyresService.getTyreBySlug(slug);
    const breadcrumbItems = [{ label: "Tyres", href: "/tyres", }, { label: tyre?.name || slug, isLast: true, },];

    return (
        <div className="">
            <Breadcrumb items={breadcrumbItems} />
            <TyresClient initialData={tyre} />
        </div>
    );
}

export default Page;