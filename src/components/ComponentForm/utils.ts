import { DefaultValues } from 'react-hook-form'

import { ComponentDraft } from 'types'
import { ComponentFormValues } from './types'

const resolveEmptyString = (value?: string) => {
  if (!value || value?.startsWith('Não há')) return ''

  return value
}

const getComponentPrerequeriments = (
  prerequeriments: string
): ComponentFormValues['prerequeriments'] => {
  // Format: ':courseNum1-:courseCode1,:courseNum2-:courseCode2,...'

  if (!prerequeriments) return []

  return prerequeriments.split(',').map(prerequeriment => {
    const [courseNum, courseCode] = prerequeriment.split('-')

    return { courseNum, courseCode }
  })
}

export const getComponentFormDefaultValues = (
  component?: ComponentDraft
): DefaultValues<ComponentFormValues> => {
  if (!component) return {}

  return {
    code: component.code,
    name: component.name,
    department: component.department,
    semester: component.semester,
    modality: component.modality,
    program: resolveEmptyString(component.program),
    objective: resolveEmptyString(component.objective),
    syllabus: resolveEmptyString(component.syllabus),
    methodology: resolveEmptyString(component.methodology),
    learningAssessment: resolveEmptyString(component.learningAssessment),
    bibliography: resolveEmptyString(component.bibliography),
    prerequeriments: getComponentPrerequeriments(
      resolveEmptyString(component.prerequeriments)
    ),
    studentWorkload: {
      theory: component.workload?.studentTheory || 0,
      practice: component.workload?.studentPractice || 0,
      theoryPractice: component.workload?.studentTheoryPractice || 0,
      internship: component.workload?.studentInternship || 0,
      practiceInternship: component.workload?.studentPracticeInternship || 0,
    },
    teacherWorkload: {
      theory: component.workload?.teacherTheory || 0,
      practice: component.workload?.teacherPractice || 0,
      theoryPractice: component.workload?.teacherTheoryPractice || 0,
      internship: component.workload?.teacherInternship || 0,
      practiceInternship: component.workload?.teacherPracticeInternship || 0,
    },
    moduleWorkload: {
      theory: component.workload?.moduleTheory || 0,
      practice: component.workload?.modulePractice || 0,
      theoryPractice: component.workload?.moduleTheoryPractice || 0,
      internship: component.workload?.moduleInternship || 0,
      practiceInternship: component.workload?.modulePracticeInternship || 0,
    },
  }
}

export const formatPrerequirements = (
  prerequeriments: ComponentFormValues['prerequeriments']
) => {
  if (!prerequeriments) return ''

  return prerequeriments
    .map(({ courseNum, courseCode }) => `${courseNum}-${courseCode}`)
    .join(',')
}
