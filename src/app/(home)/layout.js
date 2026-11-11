import { Suspense } from "react";
import Header from "@/components/organisms/header";
import EnterprisePreFooter from "./component/PreFooter";
import Footer from "./component/Footer";

export default function HomeLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Suspense fallback={null}>
                <EnterprisePreFooter />
            </Suspense>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>

    );
}
