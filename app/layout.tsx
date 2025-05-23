import '@/app/ui/global.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-primary text-white min-h-screen">
                {children}
            </body>
        </html>
    )
}
