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

export const generateSort = (sorters?: CrudSorting) => {
	if (sorters && sorters.length > 0) {
		return sorters.map((item) => ({
			[item.field]: item.order,
		}))
	}
	return []
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
