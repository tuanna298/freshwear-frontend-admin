import { CrudFilters, CrudOperators, CrudSorting } from '@refinedev/core'

export const generateFilter = (
	filters?: CrudFilters,
): Record<string, string> => {
	const queryFilters: Record<string, string> = {}

	if (filters) {
		filters.map((filter) => {
			if ('field' in filter) {
				const { field, operator, value } = filter

				if (field === 'q') {
					queryFilters[field] = value
					return
				}

				const mappedOperator = mapOperator(operator)
				queryFilters[`${field}${mappedOperator}`] = value
			}
		})
	}

	return queryFilters
}

export const generateSort = (
	sorters?: CrudSorting,
): { sortBy: string[]; orderBy: string[] } | undefined => {
	if (sorters && sorters.length > 0) {
		const sortBy: string[] = []
		const orderBy: string[] = []

		sorters.map((item) => {
			sortBy.push(item.field)
			orderBy.push(item.order)
		})

		return {
			sortBy,
			orderBy,
		}
	}

	return
}

export const mapOperator = (operator: CrudOperators): string => {
	switch (operator) {
		case 'ne':
		case 'gte':
		case 'lte':
			return `_${operator}`
		case 'contains':
			return '_like'
		case 'eq':
		default:
			return ''
	}
}
