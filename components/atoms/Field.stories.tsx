import { ComponentMeta } from '@storybook/react'
import React from 'react'

import Field from './Field'

export default {
  component: Field,
  title: 'Atoms/Field'
} as ComponentMeta<typeof Field>

export const Default = () => (
  <Field />
)
