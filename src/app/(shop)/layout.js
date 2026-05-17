import Header from "@/components/organisms/header";
import { PageShellMain } from "./Components/PageShell";
import EnterprisePreFooter from "../(home)/component/PreFooter";
import Footer from "../(home)/component/Footer";

export default function HomeLayout({ children }) {
    return (
        <div>
            <Header />
            <PageShellMain>
                {children} 
            </PageShellMain>
            <EnterprisePreFooter />
            <Footer/>
        </div>

    );
}
