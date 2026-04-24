interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { circle: 32, font: 'text-sm' },
  md: { circle: 40, font: 'text-base' },
  lg: { circle: 52, font: 'text-lg' },
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const { circle, font } = sizes[size]

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: circle,
          height: circle,
          backgroundColor: '#0ea472',
        }}
      >
        <span
          className={`text-white font-bold leading-none ${font}`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          GC
        </span>
      </div>
      <span
        className="font-bold text-foreground"
        style={{ fontFamily: 'Outfit, sans-serif', fontSize: circle * 0.45 }}
      >
        Global Chalkboard
      </span>
    </div>
  )
}
