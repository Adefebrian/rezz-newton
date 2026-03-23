interface Props {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeading({ label, title, subtitle, center, light }: Props) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {label && (
        <span className={`section-label ${light ? 'text-gold-light' : ''}`}>{label}</span>
      )}
      <h2
        className={`section-title text-4xl md:text-5xl ${
          light ? 'text-cream' : 'text-brown-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`section-body mt-4 text-lg max-w-2xl ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-cream/60' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
