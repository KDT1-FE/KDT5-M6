import dynamic from 'next/dynamic'

export const FormItem = dynamic(() => import('antd/es/form/FormItem').then((lib) => lib), {
  ssr: false
})
