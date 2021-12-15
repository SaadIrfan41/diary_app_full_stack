import Register from '../component/Register'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

const register = () => {
  return (
    <div>
      <Register />
    </div>
  )
}

export default register

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
