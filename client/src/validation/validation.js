import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )



// export default function App() {
//   const validationSchema = useMemo(
//     () =>
//       yup.object({
//         firstName: yup.string().required('Required'),
//         lastName: yup.string().required('Required')
//       }),
//     []
//   )
//   const resolver = useYupValidationResolver(validationSchema)

//   const { handleSubmit, errors, register } = useForm({ resolver })

//   console.log(errors)

//   return (
//     <form onSubmit={handleSubmit((data) => console.log(data))}>
//       <input {...register('firstName')} />
//       <input {...register('lastName')} />
//       <input type='submit' />
//     </form>
//   )
// }
