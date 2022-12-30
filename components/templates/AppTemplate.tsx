import React from 'react'

import useAuthentication from '../../hooks/useAuthentication'
import Typography from '../atoms/Typography'
import UserAvatar from '../atoms/UserAvatar'
import AppTemplateProps from './AppTemplate.props'

const AppTemplate = (props: AppTemplateProps): JSX.Element => {
  const authState = useAuthentication()

  return (
    <>
      <header>
        {authState.isAuth && (
          <UserAvatar />
        )}
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        <Typography>&copy;2023</Typography>
      </footer>
    </>
  )
}

export default AppTemplate
