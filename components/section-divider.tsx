interface SectionDividerProps {
  fromColor: string
  toColor: string
}

export default function SectionDivider({ fromColor, toColor }: SectionDividerProps) {
  return (
    <div
      className="relative -mt-1 h-24 lg:h-32"
      aria-hidden="true"
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
      }}
    />
  )
}
