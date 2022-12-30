import { ComponentMeta } from '@storybook/react'
import React from 'react'

import Form from './Form'

export default {
  component: Form,
  title: 'Atoms/Form'
} as ComponentMeta<typeof Form>

export const Default = () => (
  <Form
    isLoading={false}
    fields={(
      <input type='text' />
    )}
    onSubmit={function(e: React.FormEvent<Element>): void {
      throw new Error('Function not implemented.')
    }}
  />
)
