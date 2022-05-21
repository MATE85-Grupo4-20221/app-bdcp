import { ComponentFormValues } from 'components/ComponentForm/types'
import { formatPrerequirements } from 'components/ComponentForm/utils'
import { ComponentDraft } from 'types'

export const formValuesToComponentDraft = (
  data: ComponentFormValues
): Partial<ComponentDraft> => {
  return {
    code: data.code,
    name: data.name,
    department: data.department,
    semester: data.semester,
    modality: data.modality,
    program: data.program,
    objective: data.objective,
    syllabus: data.syllabus,
    methodology: data.methodology,
    learningAssessment: data.learningAssessment,
    bibliography: data.bibliography,
    prerequeriments: formatPrerequirements(data.prerequeriments),
    workload: {
      studentTheory: data.studentWorkload.theory,
      studentPractice: data.studentWorkload.practice,
      studentTheoryPractice: data.studentWorkload.theoryPractice,
      studentInternship: data.studentWorkload.internship,
      studentPracticeInternship: data.studentWorkload.practiceInternship,

      teacherTheory: data.teacherWorkload.theory,
      teacherPractice: data.teacherWorkload.practice,
      teacherTheoryPractice: data.teacherWorkload.theoryPractice,
      teacherInternship: data.teacherWorkload.internship,
      teacherPracticeInternship: data.teacherWorkload.practiceInternship,

      moduleTheory: data.moduleWorkload.theory,
      modulePractice: data.moduleWorkload.practice,
      moduleTheoryPractice: data.moduleWorkload.theoryPractice,
      moduleInternship: data.moduleWorkload.internship,
      modulePracticeInternship: data.moduleWorkload.practiceInternship,
    },
  }
}
