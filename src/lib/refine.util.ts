import { CrudFilters, CrudOperators, CrudSorting } from '@refinedev/core'

export const generateFilter = (
	filters?: CrudFilters,
): Record<string, string> => {
	const queryFilters: Record<string, string> = {}

	if (filters) {
		filters.map((filter) => {
			if ('field' in filter) {
				let { field, operator, value } = filter

				if (field === 'q') {
					queryFilters[field] = value
					return
				}

				// Transform 'index' to 'created_at'
				if (field === 'index') {
					field = 'created_at'
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
		return sorters.map((item) => {
			let { field, order } = item

			// Transform 'index' to 'created_at'
			if (field === 'index') {
				field = 'created_at'
			}

			return {
				[field]: order,
			}
		})
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
