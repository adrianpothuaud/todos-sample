import React from 'react'
import Button from './Button'

const testLabel = 'Button test'

it('uses custom text for the button label', () => {
  cy.mount(
    <Button
      aria={{
        description: '',
        label: 'test-button'
      }}
      id={'test-button'}
      label={testLabel}
      onClick={() => {}}
    />
  )
  cy.get('button').should('contains.text', testLabel)
})
