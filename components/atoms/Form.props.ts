import { FormEvent } from 'react'

type FormProps = {
  errors?: string[]
  fields: JSX.Element | JSX.Element[]
  isLoading: boolean
  onSubmit: (e: FormEvent) => void
  title?: string
}

export default FormProps
