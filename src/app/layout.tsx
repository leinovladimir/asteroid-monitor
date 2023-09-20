import './globals.css';


export const metadata = {
  title: 'Ловим и уничтожаем астероиды',
  description: 'Приложение, в котором можно уничтожить астероид'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}
