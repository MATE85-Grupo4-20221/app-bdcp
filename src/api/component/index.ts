import { api } from 'services'
import { Component, ListData, ListFilter } from 'types'

export const getComponents = async (
  filter: ListFilter
): Promise<ListData<Component>> => {
  const response = await api.get<ListData<Component>>(`/components`, {
    params: {
      page: filter.page,
      limit: filter.limit,
      search: filter.search?.trim(),
    },
  })

  return {
    results: response.data.results,
    total: response.data.total,
  }
}
