import dynamic from 'next/dynamic'

export const Button = dynamic(() => import('antd').then((lib) => lib.Button), {
  ssr: false
})
