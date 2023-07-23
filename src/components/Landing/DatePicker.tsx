import dynamic from 'next/dynamic'

export const DatePicker = dynamic(() => import('antd').then((lib) => lib.DatePicker), {
  ssr: false
})
