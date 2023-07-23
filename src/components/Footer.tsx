import Image from 'next/image'
import Link from 'next/link'
import GithubIcon from './ui/icons/GithubIcon'
import dynamic from 'next/dynamic'
const Tooltip = dynamic(() => import('antd').then((res) => res.Tooltip), { ssr: false })

export default function Footer() {
  return (
    <footer className="bg-forsythia footer-height absolute bottom-0 w-full">
      <div className="flex justify-between max-w-[1200px] m-auto p-8">
        <div className="text-2xl">2023 Fast-campus toy project</div>
        <div className="flex">
          <Tooltip placement="bottom" title="패스트 캠퍼스로 이동" className="icon-base-style mr-2 ">
            <Link href="https://github.com/KDT1-FE">
              <Image src="/fastcampus_icon.svg" alt="fastcampus icon" width={28} height={28} />
            </Link>
            <span className="a11y">패스트 캠퍼스로 이동</span>
          </Tooltip>
          <Tooltip placement="bottom" title="코드 보러가기" className="icon-base-style mr-2 ">
            <Link href="https://github.com/yolo-wallet/yolo-wallet">
              <GithubIcon />
              <span className="a11y">코드 보러가기</span>
            </Link>
          </Tooltip>
        </div>
      </div>
    </footer>
  )
}
