/* eslint-disable @next/next/no-img-element */
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Link from 'next/link'

import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import client from '../../../utils/api'
import Model from '../../../component/Model'
import { useState } from 'react'
import { useGetDiaryQuery } from '../../../store/rtkapi'
export const Diary = gql`
  query getDiary($getDiaryId: ID!) {
    getDiary(id: $getDiaryId) {
      author {
        image
      }
      entries {
        id
        tittle
        description
      }
    }
  }
`
type Entry = {
  id: string
  tittle: string
  description: string
}

type Diary = {
  id: string
  tittle: string
  entries: Entry
  privacy: string
  author: User
  createdAt: string
}

type User = {
  _id: string
  username: string
  email: string
  image: string
  diaries: [Diary]
  password: string
  createdAt: string
  updatedAt: string
}

const Singlediary = () => {
  const [showModal, setShowModal] = useState(false)
  const [deleteid, setdeleteid] = useState('')
  const router = useRouter()
  const { diaryid } = router.query
  const {
    data: rtkdata,
    error: rtkerror,
    isLoading,
  } = useGetDiaryQuery(diaryid)
  // const { data, loading, error } = useQuery(Diary, {
  //   variables: { getDiaryId: diaryid },
  // })
  if (isLoading)
    return (
      <div className=' min-h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    )
  console.log(rtkdata)
  const deletefunction = async (id: string) => {
    setdeleteid(id)
    setShowModal(true)
  }
  return (
    <>
      <div className=' lg:max-w-6xl w-4/5 sm:w-11/12  mx-auto '>
        <div className='flex'>
          <div>
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
          </div>
          <div className='mb-5 mt-5 flex justify-center w-10/12'>
            <Link href={`/diary/${diaryid}/entry`} passHref>
              <button
                type='button'
                className='inline-flex  px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 items-start'
              >
                <span
                  className='-ml-1 mr-3 h-5 w-5 material-icons-outlined '
                  aria-hidden='true'
                >
                  task
                </span>
                ADD New Entry
              </button>
            </Link>
          </div>
        </div>

        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {rtkdata?.getDiary?.entries?.map((entry: Entry) => (
            <li
              key={entry.id}
              className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'
            >
              <Link href={`/diary/${diaryid}/enrty/${entry?.id}`}>
                <a>
                  <div className='w-full flex items-center justify-between p-6 space-x-6'>
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='text-gray-900 text-sm font-medium truncate'>
                          {entry.tittle}
                        </h3>
                      </div>
                      <p className='mt-1 text-gray-500 text-sm truncate'>
                        {entry.description}
                      </p>
                    </div>
                    <img
                      className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                      src={rtkdata.getDiary.author.image}
                      alt=''
                    />
                  </div>
                </a>
              </Link>

              <div>
                <div className='-mt-px flex divide-x divide-gray-200'>
                  <div className='w-0 flex-1 flex hover:bg-blue-500 transition duration-500 ease-in-out rounded-md'>
                    <Link href={`/diary/updateentry/${entry?.id}`}>
                      <a className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent  hover:text-white'>
                        <PencilAltIcon
                          className='w-5 h-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>Edit</span>
                      </a>
                    </Link>
                  </div>
                  <div className='-ml-px w-0 flex-1 flex hover:bg-red-500 transition duration-500 ease-in-out rounded-md'>
                    <button
                      onClick={() => deletefunction(entry.id)}
                      className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-white'
                    >
                      <TrashIcon
                        className='w-5 h-5 text-gray-400 '
                        aria-hidden='true'
                      />
                      <span className='ml-3'>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Model
          showModal={showModal}
          setShowModal={setShowModal}
          modelheader={'Delete Entry?'}
          modelbody={'Are u sure u want to delete this entry?'}
          modelbuttonright={'Close'}
          modelbuttonleft={'Delete'}
          deleteid={deleteid}
        />
      </div>
    </>
  )
}

export default Singlediary

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await client.query({
      query: Diary,

      variables: { getDiaryId: context?.params?.diaryid },
    })
    return {
      props: {},
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
