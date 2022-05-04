import { useAuth } from 'contexts/auth'
import { Component, ComponentDraft, ComponentWorkload } from 'types'

export const useComponentAttrs = (component?: Component | undefined) => {
  const auth = useAuth()

  const getAttr = (field: keyof ComponentDraft) => {
    return auth.isAuthenticated ? component?.draft?.[field] : component?.[field]
  }

  const code = getAttr('code') as string
  const name = getAttr('name') as string
  const department = getAttr('department') as string
  const semester = getAttr('semester') as string
  const modality = getAttr('name') as string
  const program = getAttr('program') as string
  const objective = getAttr('objective') as string
  const syllabus = getAttr('syllabus') as string
  const methodology = getAttr('methodology') as string
  const learningAssessment = getAttr('learningAssessment') as string
  const bibliography = getAttr('bibliography') as string
  const prerequeriments = getAttr('prerequeriments') as string
  const workload = getAttr('workload') as ComponentWorkload

  return {
    code,
    name,
    department,
    semester,
    modality,
    program,
    objective,
    syllabus,
    methodology,
    learningAssessment,
    bibliography,
    prerequeriments,
    workload,
  }
}
