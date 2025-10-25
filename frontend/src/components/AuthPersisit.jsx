import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, setAccessToken } from '@/redux/userSlice'


const AuthPersist = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')

    if (token && user) {
      dispatch(setAccessToken(token))
      dispatch(setUser(JSON.parse(user)))
    }
  }, [dispatch])

  return null
}

export default AuthPersist