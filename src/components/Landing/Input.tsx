import dynamic from 'next/dynamic'

export const Input = dynamic(() => import('antd').then((lib) => lib.Input), {
  ssr: false
})
