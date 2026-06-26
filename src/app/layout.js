import './globals.css';

export const metadata = {
  title: 'Pathi Krishna Kanth | Portfolio Unit 9S',
  description: 'AI & Full Stack Developer Portfolio - Nier Automata Interface',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="scanlines"></div>
        {children}
      </body>
    </html>
  );
}
