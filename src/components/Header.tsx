import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import BarChartIcon from './ui/icons/BarChartIcon'
import CalendarIcon from './ui/icons/CalendarIcon'
import Login from './Login'
const Tooltip = dynamic(() => import('antd').then((res) => res.Tooltip), { ssr: false })

export default function Navbar() {
  return (
    <header className="bg-forsythia relative">
      <div className="flex justify-between items-center py-8 px-8 m-auto max-w-[1200px]">
        <div className="flex items-center flex-1">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" className="h-12 w-12 mr-4" width={12} height={12} />
          </Link>
          <span className="font-semibold text-3xl tracking-tight">YOLO Wallet</span>
        </div>
        <nav className="flex items-center mr-4">
          <Link href="/chart" prefetch={process.env.NODE_ENV === 'production'} className="icon-base-style mr-2">
            <Tooltip placement="bottom" title="차트 페이지로 이동">
              <BarChartIcon />
              <span className="a11y">차트 페이지로 이동</span>
            </Tooltip>
          </Link>
          <Link href="/calendar" prefetch={process.env.NODE_ENV === 'production'} className="icon-base-style">
            <Tooltip placement="bottom" title="캘린더 페이지로 이동">
              <CalendarIcon />
              <span className="a11y">캘린더 페이지로 이동</span>
            </Tooltip>
          </Link>
        </nav>
        <Login />
      </div>
    </header>
  )
}
