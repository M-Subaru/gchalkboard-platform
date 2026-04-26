// Login page has its own standalone layout — no admin nav
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
