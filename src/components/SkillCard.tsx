export interface Skill {
  id: string
  name: string
  description: string
  creator: string
  category: string
  pricePerCall: string
  totalCalls: number
  rating: number
  endpoint: string
  icon: string
  gradient: string
}

interface SkillCardProps {
  skill: Skill
  onClick: () => void
  index: number
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

export function SkillCard({ skill, onClick, index }: SkillCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left p-4 sm:p-5 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:-translate-y-1"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${skill.gradient} rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}
          >
            {skill.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white text-sm sm:text-base truncate group-hover:text-emerald-400 transition-colors">
              {skill.name}
            </h3>
            <p className="text-xs text-gray-500 font-mono truncate">
              {skill.creator.slice(0, 6)}...{skill.creator.slice(-4)}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 min-h-[2.5rem] sm:min-h-[2.75rem]">
          {skill.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-mono font-semibold">
              {skill.pricePerCall} ETH
            </span>
            <span className="text-gray-600">/call</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {skill.rating}
            </span>
            <span>{formatNumber(skill.totalCalls)}</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-0 right-0">
          <span className="px-2 py-1 bg-white/5 rounded-lg text-[10px] sm:text-xs text-gray-400 font-medium">
            {skill.category}
          </span>
        </div>
      </div>
    </button>
  )
}
