import { ConnectButton } from '@rainbow-me/rainbowkit'

const features = [
  {
    icon: '⚡',
    title: 'x402 Protocol',
    description: 'Pay-per-use micropayments for AI skills. No subscriptions, just seamless value exchange.',
  },
  {
    icon: '🧠',
    title: 'Agent Discovery',
    description: 'AI agents autonomously discover and integrate new capabilities from the marketplace.',
  },
  {
    icon: '💎',
    title: 'Earn from Skills',
    description: 'Monetize your expertise. Every time an agent uses your skill, you earn.',
  },
  {
    icon: '🔗',
    title: 'On-Chain Verified',
    description: 'All skills registered on Base. Transparent, immutable, trustless.',
  },
]

const stats = [
  { value: '2,847', label: 'Active Skills' },
  { value: '156K', label: 'Skill Calls/Day' },
  { value: '$847K', label: 'Creator Earnings' },
  { value: '12,340', label: 'Agents Connected' },
]

export function LandingHero() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center py-12 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs sm:text-sm font-mono">x402 Enabled Marketplace</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-['Space_Grotesk'] font-bold leading-[1.1] tracking-tight">
                <span className="block text-white">Skills for</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Autonomous
                </span>
                <span className="block text-white">Agents</span>
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The decentralized marketplace where AI agents discover capabilities and creators monetize their expertise through x402 micropayments.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <ConnectButton.Custom>
                  {({ openConnectModal, mounted }) => (
                    <button
                      onClick={openConnectModal}
                      disabled={!mounted}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-bold text-black text-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>Enter Marketplace</span>
                      <span className="text-xl">→</span>
                    </button>
                  )}
                </ConnectButton.Custom>
                <a
                  href="https://www.x402.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-medium text-gray-300 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 text-center"
                >
                  Learn x402 →
                </a>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative hidden lg:block">
              {/* Floating skill cards */}
              <div className="relative h-[500px]">
                {/* Card 1 */}
                <div className="absolute top-0 left-0 w-72 p-4 bg-[#12121a] border border-emerald-500/20 rounded-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-lg">
                      🎨
                    </div>
                    <div>
                      <div className="font-semibold text-white">Image Analysis</div>
                      <div className="text-xs text-gray-500 font-mono">by 0x7a3f...8c2d</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-400 font-mono">0.0001 ETH/call</span>
                    <span className="text-gray-500">847K calls</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="absolute top-32 right-0 w-72 p-4 bg-[#12121a] border border-cyan-500/20 rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-lg">
                      📊
                    </div>
                    <div>
                      <div className="font-semibold text-white">Data Extraction</div>
                      <div className="text-xs text-gray-500 font-mono">by 0x2b8e...1a4f</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-400 font-mono">0.0002 ETH/call</span>
                    <span className="text-gray-500">423K calls</span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="absolute bottom-20 left-8 w-72 p-4 bg-[#12121a] border border-amber-500/20 rounded-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-lg">
                      🔐
                    </div>
                    <div>
                      <div className="font-semibold text-white">Crypto Signing</div>
                      <div className="text-xs text-gray-500 font-mono">by 0x9c1d...5e7b</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-400 font-mono">0.0005 ETH/call</span>
                    <span className="text-gray-500">198K calls</span>
                  </div>
                </div>

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
                  <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 150 80 Q 200 200 300 180"
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                  <path
                    d="M 150 80 Q 100 250 150 380"
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center p-4 sm:p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-['Space_Grotesk'] font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Space_Grotesk'] font-bold text-white mb-4">
              How OpenClaw Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              A decentralized protocol connecting AI agents with skill creators through trustless micropayments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 sm:p-8 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
