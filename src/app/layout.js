import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
    title: "Vinoy — Product Designer",
    description:
        "Portfolio of Vinoy, a Product Designer crafting meaningful digital experiences.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
