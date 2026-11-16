import "./globals.css";

export const metadata = {
  title: "Delicea Kitchen",
  description: "",
  icons: { icon: "/images/delicea-favicon.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
