import type { GetServerSidePropsContext } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

// if you want to use custom login page, you can use this page.
// If you want to redirect while you're in the loged-in state, you could use "useRoute" hook.
export default function SignPage({ providers }: Props) {
  return (
    <div>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>Sign in with {provider.name}</button>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    return { redirect: { destination: '/' } }
  }
  const providers = await getProviders()
  return {
    props: { providers: providers ?? [] }
  }
}

// * reference
// https://next-auth.js.org/configuration/pages
