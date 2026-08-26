import AuthForm from '../../../components/auth-form'

export default function SignInPage() {
  return (
    <AuthForm
      title="Sign in to your account"
      alternatePrompt="Don't have an account?"
      alternateLinkLabel="Create a new account"
      alternateLinkHref="/auth/signup"
      url="/users/signin"
      submitLabel="Sign in"
      pendingLabel="Signing in..."
      errorMessage="Sign in failed. Please try again."
    />
  )
}