import { ComponentLogListFilter } from 'pages'
import { api } from 'services'
import { Component, ComponentLog, ListData, ListFilter } from 'types'

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

export const getComponentLogs = async (
  componentId: string,
  filter: ComponentLogListFilter
): Promise<ListData<ComponentLog>> => {
  const response = await api.get<ListData<ComponentLog>>(
    `/components/${componentId}/logs`,
    {
      params: {
        page: filter.page,
        limit: filter.limit,
        type: filter.type || undefined,
      },
    }
  )

  return {
    results: response.data.results,
    total: response.data.total,
  }
}

export const exportComponent = async (componentId: string): Promise<Blob> => {
  const response = await api.get<Buffer>(`/components/${componentId}/export`, {
    responseType: 'arraybuffer',
    headers: { Accept: 'application/pdf' },
  })

  return new Blob([response.data], { type: 'application/pdf;charset=utf-8' })
}

interface ImportComponentsRequestDTO {
  cdCurso: number
  nuPerCursoInicial: number
}

export const importComponents = async ({
  cdCurso,
  nuPerCursoInicial,
}: ImportComponentsRequestDTO) => {
  await api.post(`/components/import`, {
    cdCurso,
    nuPerCursoInicial,
  })
}
