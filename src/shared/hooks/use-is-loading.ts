import { useIsFetching, useIsMutating } from '@tanstack/react-query'

const useIsLoading = () => {
	const isFetching = useIsFetching()
	const isMutating = useIsMutating()

	return isFetching > 0 || isMutating > 0
}

export default useIsLoading
