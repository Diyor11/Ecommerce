import {useCallback, useEffect, useState} from 'react'

function useMediaQuery() {

    const [size, setSize] = useState(0)

    const checkScreenWidth = useCallback(() => {
        const windowWith = window.innerWidth

        setSize(windowWith)
        return windowWith
    }, [])

    useEffect(() => {
        checkScreenWidth()

        const listener = window.addEventListener('resize', checkScreenWidth)
        return () => window.removeEventListener('resize', listener)
    }, [checkScreenWidth])

  return {size, checkScreenWidth}
}

export default useMediaQuery
