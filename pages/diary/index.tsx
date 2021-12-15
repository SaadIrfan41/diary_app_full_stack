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
import { Diaries } from '../index'
import { useNewDiaryMutation } from '../../store/rtkapi'

const CreateDiary = gql`
  mutation newDiary($tittle: String!, $privacy: String!, $author: ID!) {
    newDiary(tittle: $tittle, privacy: $privacy, author: $author) {
      tittle
    }
  }
`

const Index = ({ authorid }: any) => {
  const router = useRouter()
  const [
    newDiary, // This is the mutation trigger
    result, // This is the destructured mutation result
  ] = useNewDiaryMutation()

  // const [newDiary] = useMutation(CreateDiary, {
  //   refetchQueries: [{ query: Diaries }],
  // })

  return (
    <div className=' min-h-screen w-1/3 grid place-items-center  mx-auto'>
      <Formik
        initialValues={{
          tittle: '',
          privacy: '',
        }}
        validationSchema={yup.object({
          tittle: yup
            .string()
            .max(20, 'Max 20 Characters Allowed')

            .required('Tittle is Required'),
          privacy: yup.string().required('Diary Status is Required'),
        })}
        onSubmit={async (values) => {
          console.log(values)
          try {
            const data = await newDiary({
              tittle: values.tittle,
              privacy: values.privacy,
              author: authorid,
            })
            console.log(data)

            toast.success('New Diary Created')
            router.push('/')
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
                <div
                  role='group'
                  aria-labelledby='my-radio-group'
                  className='flex justify-around '
                >
                  <label
                    className={`${
                      errors.privacy && touched.privacy && errors.privacy
                        ? 'text-red-700'
                        : ''
                    }`}
                  >
                    <Field type='radio' name='privacy' value='public' />
                    Public
                  </label>
                  <label
                    className={`${
                      errors.privacy && touched.privacy && errors.privacy
                        ? 'text-red-700'
                        : ''
                    }`}
                  >
                    <Field type='radio' name='privacy' value='private' />
                    Private
                  </label>
                </div>
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
  return {
    props: { authorid: session.userId },
  }
}
