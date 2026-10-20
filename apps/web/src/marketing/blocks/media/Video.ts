import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  fields: [
    {
      name: 'videoUrl',
      label: 'YouTube URL',
      type: 'text',
      required: true,
    },
    {
      name: 'alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Full Width', value: 'full' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'titleHeadingLevel',
      label: 'Title Heading Level',
      type: 'select',
      options: [
        { label: 'H1', value: '1' },
        { label: 'H2', value: '2' },
        { label: 'H3', value: '3' },
        { label: 'H4', value: '4' },
        { label: 'H5', value: '5' },
        { label: 'H6', value: '6' },
      ],
      defaultValue: '2',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.title),
      },
    },
    {
      name: 'titleAlignment',
      label: 'Title Alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.title),
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      name: 'descriptionAlignment',
      label: 'Description Alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.description),
      },
    },
    {
      name: 'autoPlay',
      label: 'Autoplay',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'mute',
      label: 'Mute',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'loop',
      label: 'Loop',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'showControls',
      label: 'Show Controls',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showRelated',
      label: 'Show Related Videos',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'modestBranding',
      label: 'Enable Modest Branding',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showFullscreenButton',
      label: 'Show Fullscreen Button',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'playsInline',
      label: 'Play Inline',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'startSeconds',
      label: 'Start Time (seconds)',
      type: 'number',
      min: 0,
    },
    {
      name: 'endSeconds',
      label: 'End Time (seconds)',
      type: 'number',
      min: 0,
    },
  ],
}
