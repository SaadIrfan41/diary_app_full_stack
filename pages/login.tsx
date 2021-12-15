import LoginPage from '../component/Login'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

const Login = () => {
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
