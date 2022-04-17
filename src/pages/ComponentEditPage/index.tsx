import {
  Heading,
  VStack,
  Text,
  Box,
  Accordion,
  FormControl,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { FormItem } from 'components/FormItem'
import { GeralForm } from 'components/GeralForm'
import { HourForm } from 'components/HourForm'
import { PreForm } from 'components/PreForm'
import { TextForm } from 'components/TextForm'

interface EditFormValues {
  code: string
  name: string
  department: string
  semester: string
  kind: string
}

export interface ComponentEditPageProps {
  code: string
  name: string
  // department: string
  // semester: string
  // kind: string
  // workload: ComponentWorkload
  // program: string
  // syllabus: string
}

const EditSchema = Yup.object().shape({
  code: Yup.string(),
  name: Yup.string(),
  department: Yup.string(),
  semester: Yup.string(),
  kind: Yup.string(),
})

export const ComponentEditPage: React.FC<ComponentEditPageProps> = ({
  code,
  name,
}) => {
  return (
    <VStack flex={1} alignItems='stretch' overflow='hidden' spacing={0}>
      <Box py={8} px={8} pb={4}>
        <Heading>Editar disciplina - {code}</Heading>
        <Text>Altere o conteúdo da disciplina.</Text>
      </Box>
      <Box>
        <FormControl>
          <Accordion allowMultiple>
            <FormItem
              name='Geral'
              childComp={
                <GeralForm
                  code='code'
                  name='name'
                  department='dept'
                  semester='sems'
                  kind='modalidade'
                />
              }
            />
            <FormItem
              name='Carga Horária'
              childComp={
                <HourForm
                  studentHours='68'
                  professorHours='68'
                  moduleHours='45'
                />
              }
            />
            <FormItem
              name='Pré-requisitos (por curso)'
              childComp={
                <PreForm number='101' code='mata01' buttonType='add' />
              }
            />
            <FormItem
              name='Ementa'
              childComp={
                <TextForm name='Ementa' content='Conteúdo da ementa' />
              }
            />
            <FormItem
              name='Objetivos'
              childComp={
                <TextForm name='Objetivos' content='Conteúdo dos Objetivos' />
              }
            />
            <FormItem
              name='Conteúdo Programático'
              childComp={
                <TextForm
                  name='Conteudo programatico'
                  content='Conteúdo da Conteudo programatico'
                />
              }
            />
            <FormItem
              name='Metodologia'
              childComp={
                <TextForm
                  name='Metodologia'
                  content='Conteúdo da Metodologia'
                />
              }
            />
            <FormItem
              name='Avaliação da Aprendizagem'
              childComp={
                <TextForm
                  name='Avaliação de aprendizagem'
                  content='Conteúdo da Avaliação de aprendizagem'
                />
              }
            />
            <FormItem
              name='Bibliografia'
              childComp={
                <TextForm
                  name='Bibliografia'
                  content='Conteúdo da bibliografia'
                />
              }
            />
          </Accordion>
        </FormControl>
      </Box>
    </VStack>
  )
}
