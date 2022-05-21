import {
  createSlice,
  createEntityAdapter,
  EntityState,
  PayloadAction,
  Update,
  EntityId,
} from '@reduxjs/toolkit'

import { Component, ListData } from 'types'
import { AppState } from '.'

interface ComponentState {
  data: EntityState<Component>
  total: number
}

const componentsAdapter = createEntityAdapter<Component>({
  selectId: (component: Component) => component.code,
  sortComparer: (a, b) => (b.code < a.code ? 1 : b.code > a.code ? -1 : 0),
})

const initialState: ComponentState = {
  data: componentsAdapter.getInitialState(),
  total: 0,
}

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    componentAdded: (state, action: PayloadAction<Component>) => {
      state.data = componentsAdapter.addOne(state.data, action.payload)
      state.total += 1
    },
    componentsAdded: (state, action: PayloadAction<ListData<Component>>) => {
      state.data = componentsAdapter.addMany(state.data, action.payload.results)
      state.total = action.payload.total
    },
    componentChanged: (state, action: PayloadAction<Update<Component>>) => {
      state.data = componentsAdapter.updateOne(state.data, action.payload)
    },
    componentRemoved: (state, action: PayloadAction<EntityId>) => {
      state.data = componentsAdapter.removeOne(state.data, action.payload)
    },
    cleanComponents: state => {
      state.data = componentsAdapter.removeAll(state.data)
    },
  },
})

export const {
  selectAll: selectAllComponents,
  selectById: selectComponentByCode,
} = componentsAdapter.getSelectors<AppState>(state => state.components.data)

export const {
  componentAdded,
  componentsAdded,
  componentChanged,
  componentRemoved,
  cleanComponents,
} = componentsSlice.actions

export default componentsSlice.reducer
