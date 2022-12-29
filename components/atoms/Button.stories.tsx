import { ComponentMeta } from '@storybook/react'
import React, { MouseEventHandler } from 'react'
import Button from './Button'

const defaultClickHandler: MouseEventHandler = (_e) => {
  alert('You clicked a button!')
}

const defaultLabel = 'Amazing button'

export default {
  component: Button,
  title: 'Atoms/Button'
} as ComponentMeta<typeof Button>

export const Default = () => (
  <Button
    aria={{
      description: undefined,
      label: ''
    }}
    id={''}
    label={''}
    onClick={function(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
      throw new Error('Function not implemented.')
    }}
  />
)
