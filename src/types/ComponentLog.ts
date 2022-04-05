import { User } from './User'

export interface ComponentLog {
  id: string
  type: 'creation' | 'update' | 'approval'
  description?: string
  user: User
  agreementNumber?: string
  agreementDate?: string
  createdAt: string
}
