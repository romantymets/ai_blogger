import { useEffect, useState } from 'react'
import { userService } from '@/services/user.service'
import { IUserValue } from '@/models/userServiceModel'

const useGetUser = () => {
  const [user, setUser] = useState<IUserValue | null>(null)
  const userValue = userService.user

  useEffect(() => {
    const subscription = userValue.subscribe((value) => setUser(value))
    return () => subscription.unsubscribe()
  }, [userValue])

  return {
    user,
  }
}
export default useGetUser
