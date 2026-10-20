import type { Access } from 'payload'

export const publicReadAccess: Access = ({ req }) => {
  if (req.user) {
    return true
  }

  return {
    or: [
      {
        _status: {
          equals: 'published',
        },
      },
      {
        _status: {
          exists: false,
        },
      },
    ],
  }
}
