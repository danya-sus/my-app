import { useState } from "react"

export const useFetching = (callback: () => any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try
        {
            setIsLoading(true)
            await callback()
        }
        catch (e)
        {
            setError('Что-то пошло не так')
        }
        finally
        {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error];
}