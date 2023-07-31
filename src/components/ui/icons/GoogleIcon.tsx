import { AiOutlineGoogle } from 'react-icons/ai'

type Props = {
  onClick?: () => void
}
export default function GoogleIcon({ onClick }: Props) {
  return <AiOutlineGoogle onClick={onClick} className="w-7 h-7 fill-slate-700" />
}
