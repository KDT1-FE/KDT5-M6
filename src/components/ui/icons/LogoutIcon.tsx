import { AiOutlineExport } from 'react-icons/ai'

type Props = {
  onClick?: () => void
  className?: string
}

export default function LogoutIcon({ onClick }: Props) {
  return <AiOutlineExport onClick={onClick} className="w-7 h-7 fill-slate-700" />
}
