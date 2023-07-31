import Header from './Header'
import Footer from './Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="main-height">
        <Header />
        <main className="w-full flex justify-center bg-neutral-50">{children}</main>
      </div>
      <Footer />
    </>
  )
}
