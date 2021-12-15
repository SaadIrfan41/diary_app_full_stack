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
import { Diary } from '../index'
import { useNewEntryMutation } from '../../../../store/rtkapi'

// const CreateEntry = gql`
//   mutation newEntry(
//     $tittle: String!
//     $description: String!
//     $diaryid: ID!
//     $author: ID!
//   ) {
//     newEntry(
//       tittle: $tittle
//       description: $description
//       diaryid: $diaryid
//       author: $author
//     ) {
//       tittle
//     }
//   }
// `

const Index = ({ authorid, diaryid }: any) => {
  const router = useRouter()
  const [
    newEntry, // This is the mutation trigger
    result, // This is the destructured mutation result
  ] = useNewEntryMutation()

  // const [newEntry] = useMutation(CreateEntry, {
  //   refetchQueries: [{ query: Diary, variables: { getDiaryId: diaryid } }],
  //   awaitRefetchQueries: true,
  // })

  return (
    <div className=' min-h-screen w-1/3 grid place-items-center  mx-auto'>
      <Formik
        initialValues={{
          tittle: '',
          description: '',
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
          // const tittle = values.tittle
          // console.log('TITTLE', tittle)
          try {
            const data = await newEntry({
              tittle: values.tittle,
              description: values.description,
              author: authorid,
              diaryid: diaryid,
            })
            console.log(data)
            console.log(result)

            toast.success('New Entry Created')
            router.push(`/diary/${diaryid}`)
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
                  Create Diary
                </Button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Index

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
  const id = context?.params?.diaryid
  //@ts-ignore
  if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: { authorid: session.userId, diaryid: id },
  }
}
