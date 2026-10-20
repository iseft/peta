import type { Access, CollectionConfig } from 'payload'

interface UserWithRole {
  id: string | number
  role?: string
}

const hasRole = (user: unknown, role: string): boolean =>
  user != null && typeof user === 'object' && 'role' in user && (user as UserWithRole).role === role

const isAdmin: Access = ({ req }) => hasRole(req.user, 'admin')

const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (hasRole(req.user, 'admin')) return true
  return { id: { equals: req.user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req }) => hasRole(req.user, 'admin'),
      },
      admin: {
        condition: (_data, _siblingData, { user }) => hasRole(user, 'admin'),
      },
    },
  ],
}
