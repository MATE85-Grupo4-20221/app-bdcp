import { ListItem } from '@chakra-ui/react'
import React, { memo, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { ClassCard } from 'components/ClassCard'
import { Component } from 'types'

export interface ComponentListItemProps {
  component: Component
  onSelectComponent: (component: Component) => void
}

const ComponentListItem: React.FC<ComponentListItemProps> = ({
  component: { code, name },
  component,
  onSelectComponent,
}) => {
  const { componentCode } = useParams()

  useEffect(() => {
    if (code.toLowerCase() === componentCode?.toLowerCase())
      onSelectComponent(component)
  }, [code, componentCode])

  return (
    <ListItem>
      <NavLink to={`/disciplinas/${code.toLowerCase()}`}>
        {({ isActive }) => (
          <ClassCard active={isActive} code={code} name={name} />
        )}
      </NavLink>
    </ListItem>
  )
}

export default memo(ComponentListItem)
