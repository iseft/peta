import type { TextFieldServerComponent } from 'payload'

export const DocumentURLField: TextFieldServerComponent = ({ field, value }) => {
  const url = typeof value === 'string' ? value : ''
  const label = typeof field.label === 'string' ? field.label : 'URL'
  const description =
    typeof field.admin?.description === 'string' ? field.admin.description : undefined

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        paddingBottom: '0.25rem',
      }}
    >
      <div
        style={{
          color: 'var(--theme-elevation-800)',
          fontFamily: 'inherit',
          fontSize: '0.8125rem',
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--theme-success-600)',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            overflowWrap: 'anywhere',
            textDecoration: 'underline',
            textUnderlineOffset: '0.18em',
          }}
        >
          {url}
        </a>
      ) : (
        <div
          style={{
            color: 'var(--theme-elevation-500)',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
          }}
        >
          Set a slug to generate the URL.
        </div>
      )}

      {description && (
        <div
          style={{
            color: 'var(--theme-elevation-500)',
            fontFamily: 'inherit',
            fontSize: '0.8125rem',
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      )}
    </div>
  )
}
