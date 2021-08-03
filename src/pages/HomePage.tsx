import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../types'

export const HomePage: FC<any> = ({ history }) => {
    const loading = useSelector((state: State) => state.loading)
    const user = useSelector((state: State) => state.user)

    useEffect(() => {
        if (!loading && !user) {
            history.push('/login')
        } else {
            history.push('/app')
        }
    }, [user, loading])

    return <div></div>
}
