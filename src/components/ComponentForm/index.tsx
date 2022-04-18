import { VStack, Box, Accordion, HStack, Button, Flex } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { DefaultValues, useForm } from 'react-hook-form'

import { Input } from 'components/Input'
import { TextareaInput } from 'components/TextareaInput'

import { AccordionItem } from './AccordionItem'
import { PrerequerimentInput } from './PrerequerimentInput'
import { WorkloadInput } from './WorkloadInput'

import { componentSchema } from './schema'
import { ComponentFormValues } from './types'

export interface ComponentFormProps {
  defaultValues: DefaultValues<ComponentFormValues>
  onSubmit: (data: ComponentFormValues) => void
}

export const ComponentForm: React.FC<ComponentFormProps> = props => {
  const { control, handleSubmit, formState } = useForm<ComponentFormValues>({
    mode: 'onChange',
    resolver: yupResolver(componentSchema),
    defaultValues: props.defaultValues,
  })

  return (
    <Flex as='form' direction='column' onSubmit={handleSubmit(props.onSubmit)}>
      <Accordion w='full' allowMultiple>
        <AccordionItem label='Geral'>
          <VStack flex={1} alignItems='stretch'>
            <HStack>
              <Box flex={1}>
                <Input
                  name='code'
                  label='Código'
                  placeholder='MATA02'
                  control={control}
                />
              </Box>

              <Box flex={3}>
                <Input
                  name='name'
                  label='Nome'
                  placeholder='Cálculo A'
                  control={control}
                />
              </Box>

              <Box flex={2}>
                <Input
                  name='department'
                  label='Departamento'
                  placeholder='Matemática'
                  control={control}
                />
              </Box>

              <Box flex={1}>
                <Input
                  name='semester'
                  label='Semestre Vigente'
                  placeholder='2006.2'
                  control={control}
                />
              </Box>
            </HStack>

            <Box>
              <TextareaInput
                name='modality'
                label='Modalidade'
                placeholder='Modalidade'
                control={control}
              />
            </Box>
          </VStack>
        </AccordionItem>

        <AccordionItem label='Carga horária'>
          <VStack alignItems='flex-start' spacing={4}>
            <WorkloadInput
              name='studentWorkload'
              label='Estudante'
              control={control}
              min={0}
            />

            <WorkloadInput
              name='teacherWorkload'
              label='Professor'
              control={control}
              min={0}
            />

            <WorkloadInput
              name='moduleWorkload'
              label='Módulo'
              control={control}
              min={0}
            />
          </VStack>
        </AccordionItem>

        <AccordionItem label='Pré-requisito (por curso)'>
          <PrerequerimentInput name='prerequeriments' control={control} />
        </AccordionItem>

        <AccordionItem label='Ementa'>
          <TextareaInput
            name='program'
            placeholder='Ementa'
            control={control}
          />
        </AccordionItem>

        <AccordionItem label='Objetivos'>
          <TextareaInput
            name='objective'
            placeholder='Objetivos'
            control={control}
          />
        </AccordionItem>

        <AccordionItem label='Conteúdo programático'>
          <TextareaInput
            name='syllabus'
            placeholder='Conteúdo programático'
            control={control}
          />
        </AccordionItem>

        <AccordionItem label='Metodologia'>
          <TextareaInput
            name='methodology'
            placeholder='Metodologia'
            control={control}
          />
        </AccordionItem>

        <AccordionItem label='Avaliação da aprendizagem'>
          <TextareaInput
            name='learningAssessment'
            placeholder='Avaliação da aprendizagem'
            control={control}
          />
        </AccordionItem>

        <AccordionItem label='Bibliografia'>
          <TextareaInput
            name='bibliography'
            placeholder='Bibliografia'
            control={control}
          />
        </AccordionItem>
      </Accordion>

      <Button
        type='submit'
        colorScheme='primary'
        disabled={formState.isSubmitting}
        isLoading={formState.isSubmitting}
        w={48}
        mt={8}
        mb={8}
        size='lg'
        alignSelf='flex-end'
      >
        Salvar
      </Button>
    </Flex>
  )
}