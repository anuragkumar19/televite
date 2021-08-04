import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../types'

export const useProtect = (history: any) => {
    const loading = useSelector((state: State) => state.loading)
    const user = useSelector((state: State) => state.user)

    useEffect(() => {
        if (!loading && !user) {
            history.push('/login')
        }
    }, [user, loading])
}
