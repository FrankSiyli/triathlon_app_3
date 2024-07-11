import "./globals.css";
import { Inter } from "next/font/google";
import RecoilRootWrapper from "./RecoilRootWrapper";
import Script from "next/script";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "siyli-app.de",
  url: "siyli-app.de",
  description: "Trainingsplan-app für Ausdauersport",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-light font-sans `}>
        <RecoilRootWrapper>
          <AuthProvider>{children}</AuthProvider>
        </RecoilRootWrapper>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-T77L3PH7V5"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-T77L3PH7V5', {
page_path: window.location.pathname,
});
`,
          }}
        />
      </body>
    </html>
  );
}
