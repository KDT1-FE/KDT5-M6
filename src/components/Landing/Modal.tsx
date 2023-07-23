import dynamic from 'next/dynamic'

export const Modal = dynamic(() => import('antd').then((lib) => lib.Modal), {
  ssr: false
})
