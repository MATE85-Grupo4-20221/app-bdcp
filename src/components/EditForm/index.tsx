import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { GeralForm } from 'components/GeralForm'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { HourForm } from 'components/HourForm'
import { PreForm } from 'components/PreForm'
import { TextForm } from 'components/TextForm'

interface FormValues {
  code: string
  name: string
  department: string
  semester: string
  kind: string
}

const loginSchema = Yup.object().shape({
  code: Yup.string(),
  name: Yup.string(),
  department: Yup.string(),
  semester: Yup.string(),
  kind: Yup.string(),
})

export const EditForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Geral
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <GeralForm
            code='code'
            name='name'
            department='dept'
            semester='sems'
            kind='modalidade'
          />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Carga horária
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <HourForm studentHours='68' professorHours='68' moduleHours='45' />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Pré-requisitos (por curso)
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <PreForm number='101' code='mata01' buttonType='add' />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Ementa
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TextForm name='Ementa' content='Conteúdo da ementa' />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Objetivos
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TextForm name='Objetivos' content='Conteúdo dos Objetivos' />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Conteúdo programático
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TextForm
            name='Conteudo programatico'
            content='Conteúdo da Conteudo programatico'
          />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Metodologia
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TextForm name='Metodologia' content='Conteúdo da Metodologia' />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Avaliação da aprendizagem
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TextForm
            name='Avaliação de aprendizagem'
            content='Conteúdo da Avaliação de aprendizagem'
          />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Bibliografia
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TextForm name='bibliografia' content='Conteúdo da bibliografia' />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
