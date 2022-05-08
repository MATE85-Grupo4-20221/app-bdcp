import { ComponentWorkload } from 'types'

export const getStudentWorkload = (workload?: ComponentWorkload) => {
  if (!workload) return 0

  // TODO: Analyze possible workload calculations
  return (
    workload.studentTheory +
    workload.studentPractice +
    workload.studentInternship +
    workload.studentTheoryPractice +
    workload.studentPracticeInternship
  )
}

export const getTeacherWorkload = (workload?: ComponentWorkload) => {
  if (!workload) return 0

  // TODO: Analyze possible workload calculations
  return (
    workload.teacherTheory +
    workload.teacherPractice +
    workload.teacherInternship +
    workload.teacherTheoryPractice +
    workload.teacherPracticeInternship
  )
}

export const getModuleWorkload = (workload?: ComponentWorkload) => {
  if (!workload) return 0

  // TODO: Analyze possible workload calculations
  return (
    workload.moduleTheory +
    workload.modulePractice +
    workload.moduleInternship +
    workload.moduleTheoryPractice +
    workload.modulePracticeInternship
  )
}
