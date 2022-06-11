import { User } from './User'

export interface ComponentLog {
  id: string
  type: 'creation' | 'approval' | 'draft_update'
  description?: string
  user: User
  agreementNumber?: string
  agreementDate?: string
  createdAt: string
}
