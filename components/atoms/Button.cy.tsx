import React from 'react'

import Button from './Button'

const testLabel = 'Button test'

describe('Button component', () => {

  it('uses a prop for the button label', () => {
    cy.mount(
      <Button
        id={'test-button'}
        label={testLabel}
        aria={{
          description: '',
          label: 'test-button'
        }}
        onClick={() => {}}
      />
    )
    cy.get('button').should('contains.text', testLabel)
  })
})
