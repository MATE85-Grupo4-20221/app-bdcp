import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ComponentsListPage } from './pages'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/disciplinas' element={<ComponentsListPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
