import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'

import env from '../lib/env'
import { RootState } from '../state/store'

const useAuthentication = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const [cookies, setCookie, removeCookie] = useCookies([env.NEXT_PUBLIC_AUTH_COOKIE])

  useEffect(() => {
    if (cookies[env.NEXT_PUBLIC_AUTH_COOKIE] !== null) {
      // TODO: call api /check-auth
    }
  }, [])

  return {
    isAuth
  }
}

export default useAuthentication
