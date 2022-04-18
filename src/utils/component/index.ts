import { ComponentWorkload } from 'types'

export const getStudentWorkload = (workload?: ComponentWorkload) => {
  if (!workload) return 0

  // TODO: Analyze possible workload calculations
  return (
    workload.studentTheory +
    workload.studentPractice +
    workload.studentInternship
  )
}
