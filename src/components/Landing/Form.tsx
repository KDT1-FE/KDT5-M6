import dynamic from 'next/dynamic'

export const Form = dynamic(() => import('antd').then((lib) => lib.Form), {
  ssr: false,
  loading: () => <div className="w-full max-w-[30rem] h-[32px] bg-[rgba(0,0,0,0.2)] rounded-md" />
})
