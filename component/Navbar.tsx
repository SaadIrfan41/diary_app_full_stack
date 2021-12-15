/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
const Navbar = () => {
  const [session, loading] = useSession()
  if (loading)
    return (
      <div className=' min-h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900'></div>
      </div>
    )

  return (
    <div>
      <div className='w-full mx-auto px-4 sm:px-6 '>
        <div className='flex justify-between border-b-2 border-gray-100 py-4 items-center max-w-7xl mx-auto'>
          <div className='flex'>
            <Link href='/'>
              <a className='flex items-center flex-shrink-0'>
                <img
                  className='h-15 w-auto sm:h-10'
                  src='/diarylogo.svg'
                  alt=''
                />
                Diary App
              </a>
            </Link>
          </div>
          <div className='flex items-center'>
            <div>
              <h3 className='text-sm tracking-wide font-medium text-gray-500 uppercase px-2'>
                Diaries
              </h3>
            </div>
            <div>
              <h3 className='text-sm tracking-wide font-medium text-gray-500 uppercase px-2'>
                Profile
              </h3>
            </div>
            <div>
              <h3 className='text-sm tracking-wide font-medium text-gray-500 uppercase px-2'>
                Settings
              </h3>
            </div>
          </div>
          <div className='flex'>
            {!session ? (
              <>
                <div className=' px-2'>
                  <Link href='/login'>
                    <a className=' space-x-10 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-700'>
                      Sign In
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href='/register'>
                    <a className=' space-x-10 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-700'>
                      Sign Up
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button
                    className=' space-x-10 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-700'
                    onClick={() => signOut()}
                  >
                    LogOut
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
