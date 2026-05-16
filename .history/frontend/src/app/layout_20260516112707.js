import "./globals.css";

import {
  Plus_Jakarta_Sans,
} from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatSphere",
  description: "Realtime Chat App",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}