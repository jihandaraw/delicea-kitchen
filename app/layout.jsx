import "./globals.css";

export const metadata = {
  title: "Delicea Kitchen",
  description: "",
  icons: { icon: "/images/delicea-favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
