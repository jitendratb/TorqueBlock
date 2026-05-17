import Link from "next/link";
import Header from "@/components/organisms/header";
import EnterprisePreFooter from "./component/PreFooter";
import Footer from "./component/Footer";

export default function HomeLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
              <EnterprisePreFooter />
              <Footer />
        </div>

    );
}
