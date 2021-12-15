import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import client from '../../../../../utils/api'
import { useGetSingleEntryQuery } from '../../../../../store/rtkapi'

const Entry = gql`
  query ($getEntryId: ID!) {
    getEntry(id: $getEntryId) {
      author {
        username
      }
      diaryid {
        tittle
      }
      tittle
      description
    }
  }
`

const SingleEntry = () => {
  const router = useRouter()
  const { singleentry } = router.query
  const { data, error, isLoading } = useGetSingleEntryQuery(singleentry)
  console.log(router.query)

  if (isLoading)
    return (
      <div className=' min-h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    )
  if (error) return <h1>Error</h1>
  console.log(error)
  return (
    <div>
      <div className='lg:max-w-6xl w-4/5 sm:w-11/12 mx-auto '>
        <div className='mb-5 mt-5'>
          <button
            type='button'
            onClick={() => Router.back()}
            className='inline-flex  px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 items-start'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
              />
            </svg>
            Back
          </button>
        </div>
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <dl className='sm:divide-y sm:divide-gray-200'>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>User Name</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {data?.getEntry?.author?.username}
                </dd>
              </div>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Diary Tittle
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {data?.getEntry?.diaryid?.tittle}
                </dd>
              </div>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Entry Tittle
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {data?.getEntry?.tittle}
                </dd>
              </div>

              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Entry Description
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {data?.getEntry?.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEntry

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const { data } = await client.query({
//       query: Entry,

//       variables: { getEntryId: context?.params?.singleentry },
//     })
//     return {
//       props: {
//         getEntryId: context?.params?.singleentry,
//         data,
//       },
//     }
//   } catch (error) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
// }
