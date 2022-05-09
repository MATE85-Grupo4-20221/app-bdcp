import { useAuth } from 'contexts/auth'
import { Component, ComponentDraft, ComponentWorkload } from 'types'

type ComponentType = Omit<Component, 'id' | 'userId' | 'draft' | 'logs'>

const componentAttrFallbackLabelMap: Record<keyof ComponentType, string> = {
  code: 'Não há Código cadastrado',
  name: 'Não há Nome cadastrado',
  department: 'Não há Departamento cadastrado',
  semester: 'Não há Semestre Vigente cadastrado',
  modality: 'Não há Modalidade cadastrada',
  program: 'Não há Ementa cadastrada',
  objective: 'Não há Objetivo cadastrado',
  syllabus: 'Não há Conteúdo Programático cadastrado',
  methodology: 'Não há Metodologia cadastrada',
  learningAssessment: 'Não há Avaliação de Aprendizagem cadastrada',
  bibliography: 'Não há Bibliografia cadastrada',
  prerequeriments: 'Não há Pré-Requisitos cadastrados',
  workload: 'Não há Carga Horária cadastrada',
}

export const useComponentAttrs = (
  component?: Component | undefined,
  publishedVersion = false
) => {
  const auth = useAuth()

  const getAttr = (field: keyof ComponentDraft) => {
    return auth.isAuthenticated && !publishedVersion
      ? component?.draft?.[field]
      : component?.[field]
  }

  const code = getAttr('code') as string
  const name = getAttr('name') as string
  const department = getAttr('department') as string
  const semester = getAttr('semester') as string
  const modality = getAttr('modality') as string
  const program = getAttr('program') as string
  const objective = getAttr('objective') as string
  const syllabus = getAttr('syllabus') as string
  const methodology = getAttr('methodology') as string
  const learningAssessment = getAttr('learningAssessment') as string
  const bibliography = getAttr('bibliography') as string
  const prerequeriments = getAttr('prerequeriments') as string
  const workload = getAttr('workload') as ComponentWorkload

  return {
    code: code || componentAttrFallbackLabelMap.code,
    name: name || componentAttrFallbackLabelMap.name,
    department: department || componentAttrFallbackLabelMap.department,
    semester: semester || componentAttrFallbackLabelMap.semester,
    modality: modality || componentAttrFallbackLabelMap.modality,
    program: program || componentAttrFallbackLabelMap.program,
    objective: objective || componentAttrFallbackLabelMap.objective,
    syllabus: syllabus || componentAttrFallbackLabelMap.syllabus,
    methodology: methodology || componentAttrFallbackLabelMap.methodology,
    learningAssessment:
      learningAssessment || componentAttrFallbackLabelMap.learningAssessment,
    bibliography: bibliography || componentAttrFallbackLabelMap.bibliography,
    prerequeriments:
      prerequeriments || componentAttrFallbackLabelMap.prerequeriments,
    workload: workload || componentAttrFallbackLabelMap.workload,
  }
}
