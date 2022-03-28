import { ComponentWorkload } from 'types'

export const getStudentWorkload = (workload: ComponentWorkload) => {
  // TODO: Analyze possible workload calculations
  return (
    workload.studentTheory +
    workload.studentPractice +
    workload.studentInternship
  )
}
