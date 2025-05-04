// This layout can be used to provide a consistent structure for login/signup pages,
// potentially without the main header/footer or with a simplified version.

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
       {children}
    </div>
  );
}
