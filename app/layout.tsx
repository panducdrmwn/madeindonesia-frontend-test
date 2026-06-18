import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3D Model Viewer',
  description: 'Load and interact with multiple 3D models in a Three.js viewer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
