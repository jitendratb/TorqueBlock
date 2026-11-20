import Header from "@/components/organisms/header";
import { PageShellMain } from "../(shop)/Components/PageShell";

export const viewport = {
    themeColor: "#000000",
};

export default function HomeLayout({ children }) {
    return (
        <div>
            <Header InputLink={false} />
            <PageShellMain>
                {children}
            </PageShellMain>
        </div>

    );
}
