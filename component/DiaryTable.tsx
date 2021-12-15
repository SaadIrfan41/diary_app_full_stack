import { useState } from 'react'
import Image from 'next/image'

import router from 'next/router'
import Model from './Model'

type Entry = {
  id: string
  tittle: string
  description: string
}

export type Diary = {
  id: string
  tittle: string
  entries: [Entry]
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

const DiaryTable = ({ data, userid }: any) => {
  const [showModal, setShowModal] = useState(false)

  console.log(data)
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle  min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    User Name
                  </th>
                  <th
                    scope='col'
                    className=' px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Diary Title
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='flex justify-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Entries
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data?.getDiaries?.map((diary: Diary) => (
                  <tr key={diary.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10'>
                          <Image
                            src={
                              diary?.author?.image
                                ? diary?.author?.image
                                : '/avatar.png'
                            }
                            alt='Picture of the user'
                            width={40}
                            height={40}
                            className='rounded-full'
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            <button
                              onClick={() =>
                                userid === diary.author._id ||
                                diary.privacy === 'public'
                                  ? router.push(`/diary/${diary.id}`)
                                  : userid
                                  ? setShowModal(true)
                                  : router.push(`/login`)
                              }
                            >
                              {diary?.author?.username}
                            </button>
                          </div>
                          <div className='text-sm text-gray-500'>
                            {diary?.author?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>
                        <div
                        // onClick={() =>
                        //   userid === diary.author._id
                        //     ? router.push(`/diary/${diary.id}`)
                        //     : userid
                        //     ? setShowModal(true)
                        //     : router.push(`/login`)
                        // }
                        >
                          {diary?.tittle}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`${
                          diary.privacy === 'private'
                            ? 'bg-red-100 text-red-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full '
                            : 'bg-green-100 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full '
                        }'`}
                      >
                        {diary.privacy.charAt(0).toUpperCase() +
                          diary.privacy.slice(1)}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center text-gray-500'>
                      {diary.entries.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Model
        showModal={showModal}
        setShowModal={setShowModal}
        modelheader={'Private Diary'}
        modelbody={'Only Diary Owners can visit their Private Diaries'}
        modelbuttonright={'Close'}
        // modelbuttonleft={'Delete'}
      />
    </div>
  )
}

export default DiaryTable
