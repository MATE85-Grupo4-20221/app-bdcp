import { ListItem } from '@chakra-ui/react'
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { ClassCard } from 'components/ClassCard'
import { Component } from 'types'

export interface ComponentListItemProps {
  component: Component
}

const ComponentList: React.FC<ComponentListItemProps> = ({
  component: { code, name },
}) => {
  return (
    <ListItem my={4}>
      <NavLink to={`/disciplinas/${code.toLowerCase()}`}>
        {({ isActive }) => (
          <ClassCard active={isActive} code={code} name={name} />
        )}
      </NavLink>
    </ListItem>
  )
}

export const ComponentListItem = memo(ComponentList)
