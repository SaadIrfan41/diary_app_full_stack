import React from 'react'
//@ts-ignore
import InputIcon from '@material-tailwind/react/InputIcon'
//@ts-ignore
import Button from '@material-tailwind/react/Button'
import { Formik } from 'formik'
import * as yup from 'yup'
import { getSession, signIn, SignInResponse } from 'next-auth/client'
import Router from 'next/router'
import { toast } from 'react-toastify'

const Login = () => {
  return (
    <div className=' min-h-screen w-1/3 grid place-items-center  mx-auto  '>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={yup.object({
          email: yup
            .string()
            .email('Invalid email address')

            .required('Email is Required'),
          password: yup
            .string()
            .min(6, 'Min 6 characters required')
            .required('Password is Required'),
        })}
        onSubmit={async (values) => {
          console.log(values)
          const res: SignInResponse | undefined = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            action: 'login',
          })
          console.log('RESPONCE', res)
          if (res?.error) {
            return toast.error(res.error)
          }

          const session = await getSession()

          if (session) {
            return Router.push('/')
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
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='email'
                  color='indigo'
                  size='regular'
                  outline={true}
                  placeholder='Email'
                  iconFamily='material-icons'
                  iconName='email'
                  error={errors.email && touched.email && errors.email}
                  success={!errors.email && touched.email ? 'Valid' : ''}
                />
              </div>
              <div className='pb-5 pt-2'>
                <InputIcon
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='password'
                  color='indigo'
                  size='regular'
                  outline={true}
                  placeholder='Password'
                  iconFamily='material-icons'
                  iconName='password'
                  error={errors.password && touched.password && errors.password}
                  success={!errors.password && touched.password ? 'Valid' : ''}
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
                  Login
                </Button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Login
