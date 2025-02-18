import { login, signup } from '@/app/lib/login'

type Params = Promise<{
  next?: string
}>

export default async function LoginPage({
  params,
}: {
  params: Params
}) {
  const resolvedParams = await params
  const next = resolvedParams.next

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-primary-dark p-8">
        <div>
          <h2 className={`text-center text-3xl font-bold text-white`}>
            Admin Login
          </h2>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-0 bg-white/5 p-2 text-white"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 bg-white/5 p-2 text-white"
                placeholder="Password"
              />
            </div>
          </div>

          <input
            type="hidden"
            name="next"
            value={next ?? '/admin'}
          />

          <div className="flex gap-4">
            <button
              formAction={login}
              className="flex-1 rounded-md bg-primary-light px-3 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="flex-1 rounded-md bg-primary-light/50 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-hover/50"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
