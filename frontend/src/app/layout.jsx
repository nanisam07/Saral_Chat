import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'NexusChat — Realtime Messaging',
  description: 'Premium realtime chat application',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-void-950">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(8, 15, 28, 0.95)',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: 'DM Sans, system-ui, sans-serif',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(139,92,246,0.1)',
              },
              success: {
                iconTheme: { primary: '#8b5cf6', secondary: '#020408' },
              },
              error: {
                iconTheme: { primary: '#ec4899', secondary: '#020408' },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
