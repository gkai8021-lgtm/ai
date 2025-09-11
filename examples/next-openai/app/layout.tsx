import './globals.css';

export const metadata = {
  title: 'Nexora',
  description: 'The Search Engine That Executes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
