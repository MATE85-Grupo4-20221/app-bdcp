import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Layout } from 'components/Layout'
import { ComponentListPage, ComponentDetailsPage } from 'pages'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ComponentListPage />} />

          <Route path='disciplinas' element={<ComponentListPage />}>
            <Route path=':componentId' element={<ComponentDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
