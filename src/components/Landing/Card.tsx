import dynamic from 'next/dynamic'

export const Card = dynamic(() => import('antd').then((lib) => lib.Card), {
  ssr: false
})
