import AuthForm from '../../../components/auth-form'

export default function SignUpPage() {
  return (
    <AuthForm
      title="Create new account"
      alternatePrompt="Already have an account?"
      alternateLinkLabel="Sign in to your account"
      alternateLinkHref="/auth/signin"
      url="/users/signup"
      submitLabel="Sign up"
      pendingLabel="Signing up..."
      errorMessage="Sign up failed. Please try again."
    />
  )
}