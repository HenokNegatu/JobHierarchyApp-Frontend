import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Job Hierarchy App",
  description: "Perago Job Hierarchy App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider theme={{
          colors: {
            customBlack: [
              '#f5f5f5',
              '#e0e0e0',
              '#bdbdbd',
              '#9e9e9e',
              '#757575',
              '#616161',
              '#424242',
              '#212121',
              '#121212',
              '#000000',
            ],
          },
          primaryColor: 'customBlack',
        }}>{children}</MantineProvider>
      </body>
    </html>
  );
}
