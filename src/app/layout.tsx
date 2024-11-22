import type { Metadata } from "next";
import localFont from "next/font/local";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import "./globals.css";
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';


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

  const theme = createTheme({
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
      lightBlack: [
        "#FF5733", // Vibrant Orange *
        "#33FF57", // Bright Green
        "#3357FF", // Deep Blue
        "#F5A623", // Warm Amber
        "#8E44AD", // Rich Purple
        "#2ECC71", // Fresh Mint
        "#E74C3C", // Fiery Red
        "#3498DB", // Sky Blue *
        "#F1C40F", // Sunny Yellow
        "#34495E", // Slate Gray
      ]
    },
    primaryColor: 'customBlack',
  })

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
