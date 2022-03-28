export interface ComponentLog {
  id: string
  type: 'creation' | 'update' | 'approval'
  description?: string
  updatedBy?: string
  agreementNumber?: string
  agreementDate?: string
  createdAt: string
}
