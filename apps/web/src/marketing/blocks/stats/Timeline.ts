import { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  fields: [
    {
      name: 'timelineItems',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        {
          name: 'date',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter a date (e.g., "Aug 2021") or any text label',
          },
        },
        {
          name: 'isDate',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Check if this is an actual date (will use semantic <time> tag)',
          },
        },
        {
          name: 'isCurrent',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check if this is the current step in the timeline',
          },
        },
      ],
    },
  ],
}
