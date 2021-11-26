import Home from '../../components/Home'
import UserDetailModal from '../../../components/UserDetailModal'
import { useState } from 'react'
import { styles } from './styles'

const HomeScreen = () => {
  const [userId, setUserId] = useState<string>()

  const pressRow = (userId: string) => {
    setUserId(userId)
  }

  const closeDetailModal = () => {
    setUserId(undefined)
  }

  return (
    <div style={styles.container}>
      <Home onPressRow={pressRow} />
      <UserDetailModal userId={userId} onClose={closeDetailModal} />
    </div>
  )
}

export default HomeScreen
