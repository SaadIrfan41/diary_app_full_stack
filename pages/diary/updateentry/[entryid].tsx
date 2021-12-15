//@ts-ignore
import InputIcon from '@material-tailwind/react/InputIcon'
//@ts-ignore
import Button from '@material-tailwind/react/Button'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { useMutation, useQuery, gql } from '@apollo/client'
import { toast } from 'react-toastify'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Diary } from '../[diaryid]/index'
import client from '../../../utils/api'
import { useGetEntryQuery, useUpdateEntryMutation } from '../../../store/rtkapi'

// const UpdateEntry = gql`
//   mutation updateEntry(
//     $tittle: String!
//     $description: String!
//     $updateEntryId: ID!
//   ) {
//     updateEntry(
//       tittle: $tittle
//       description: $description
//       id: $updateEntryId
//     ) {
//       diaryid {
//         id
//       }
//     }
//   }
// `

const Entry = gql`
  query getEntry($getEntryId: ID!) {
    getEntry(id: $getEntryId) {
      tittle
      description
      diaryid {
        id
      }
    }
  }
`

const Update = ({ authorid }: any) => {
  const router = useRouter()
  const { entryid } = router.query
  // console.log('ENTRY ID', entryid)
  const {
    data: rtkdata,
    error: rtkerror,
    isLoading,
  } = useGetEntryQuery(entryid)
  const [
    updateEntry, // This is the mutation trigger
    result, // This is the destructured mutation result
  ] = useUpdateEntryMutation()
  // const [newEntry, { error: updaterror }] = useMutation(UpdateEntry, {
  //   awaitRefetchQueries: true,
  //   refetchQueries: [
  //     { query: Diary, variables: { getDiaryId: data?.getEntry?.diaryid?.id } },
  //   ],
  // })
  if (isLoading)
    return (
      <div className=' min-h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    )
  console.log(rtkdata)

  // console.log(updaterror)
  // console.log(data?.getEntry?.diaryid?.id)
  return (
    <div className=' min-h-screen w-1/3 grid place-items-center  mx-auto'>
      <Formik
        initialValues={{
          tittle: rtkdata?.getEntry?.tittle,
          description: rtkdata?.getEntry?.description,
        }}
        validationSchema={yup.object({
          tittle: yup
            .string()
            .max(20, 'Max 20 Characters Allowed')

            .required('Tittle is Required'),
          description: yup
            .string()

            .required('Description is Required'),
        })}
        onSubmit={async (values) => {
          console.log(values)
          try {
            const res = await updateEntry({
              tittle: values.tittle,
              description: values.description,
              updateEntryId: entryid,
            })
            console.log(res)
            console.log(result)

            toast.success('Entry Updated')
            router.push(`/diary/${rtkdata?.getEntry?.diaryid?.id}`)
          } catch (err) {
            console.log(err)
            //  toast.error(err?.message)
          }
        }}
      >
        {({
          errors,

          touched,

          handleChange,

          handleBlur,

          handleSubmit,

          isSubmitting,
        }) => (
          <div className=' w-full h-1/2 '>
            <form onSubmit={handleSubmit}>
              <div className='pb-5 pt-2'>
                <InputIcon
                  name='tittle'
                  defaultValue={rtkdata?.getEntry?.tittle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='text'
                  color='indigo'
                  size='regular'
                  outline={true}
                  placeholder='Tittle'
                  iconFamily='material-icons'
                  iconName=''
                  error={errors.tittle && touched.tittle && errors.tittle}
                  success={!errors.tittle && touched.tittle ? 'Valid' : ''}
                />
              </div>
              <div className='pb-5 pt-2'>
                <InputIcon
                  name='description'
                  defaultValue={rtkdata?.getEntry?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='textarea'
                  color='indigo'
                  size='regular'
                  outline={true}
                  placeholder='Description'
                  iconFamily='material-icons'
                  iconName=''
                  error={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                  success={
                    !errors.description && touched.description ? 'Valid' : ''
                  }
                />
              </div>

              <div className='flex justify-center pt-2'>
                <Button
                  type='submit'
                  size='lg'
                  onSubmit={handleSubmit}
                  color='indigo'
                  ripple='dark'
                  disabled={isSubmitting}
                >
                  Update Entry
                </Button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Update

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: { authorid: session.userId },
  }
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   try {
//     const { data } = await client.query({
//       query: Entry,

//       variables: { getEntryId: context?.params?.entryid },
//     })
//     return {
//       props: {
//         entryid: context?.params?.entryid,
//         authorid: session.userId,
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
