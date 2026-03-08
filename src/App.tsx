import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'
import { useState } from 'react'
import { formatEther } from 'viem'
import { Marketplace } from './components/Marketplace'
import { MySkills } from './components/MySkills'
import { CreateSkill } from './components/CreateSkill'
import { LandingHero } from './components/LandingHero'

type Tab = 'discover' | 'my-skills' | 'create'

export default function App() {
  const { isConnected, address } = useAccount()
  const { data: balance } = useBalance({ address })
  const [activeTab, setActiveTab] = useState<Tab>('discover')

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Header */}
      <header className="relative z-50 border-b border-emerald-500/10 backdrop-blur-xl bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg rotate-45 animate-pulse" />
                <div className="absolute inset-1 bg-[#0a0a0f] rounded-md rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center text-emerald-400 font-bold text-sm sm:text-lg">⚡</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl tracking-tight">
                  <span className="text-emerald-400">Open</span>
                  <span className="text-white">Claw</span>
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-500/60 font-mono tracking-widest">x402 SKILLS</span>
              </div>
            </div>

            {/* Navigation - Desktop */}
            {isConnected && (
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { id: 'discover' as const, label: 'Discover', icon: '◈' },
                  { id: 'my-skills' as const, label: 'My Skills', icon: '⬡' },
                  { id: 'create' as const, label: 'Create', icon: '✦' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Balance + Connect */}
            <div className="flex items-center gap-2 sm:gap-4">
              {isConnected && balance && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 font-mono text-sm">
                    {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
                  </span>
                </div>
              )}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted
                  const connected = ready && account && chain

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-semibold text-black text-sm sm:text-base hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105"
                            >
                              Connect
                            </button>
                          )
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium text-sm border border-red-500/30"
                            >
                              Wrong Network
                            </button>
                          )
                        }

                        return (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={openChainModal}
                              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              {chain.hasIcon && (
                                <div className="w-4 h-4">
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain'}
                                      src={chain.iconUrl}
                                      className="w-4 h-4"
                                    />
                                  )}
                                </div>
                              )}
                            </button>
                            <button
                              onClick={openAccountModal}
                              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                            >
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" />
                              <span className="font-mono text-sm text-gray-300">
                                {account.displayName}
                              </span>
                            </button>
                          </div>
                        )
                      })()}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isConnected && (
            <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto scrollbar-hide">
              {[
                { id: 'discover' as const, label: 'Discover', icon: '◈' },
                { id: 'my-skills' as const, label: 'My Skills', icon: '⬡' },
                { id: 'create' as const, label: 'Create', icon: '✦' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-[10px]">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {!isConnected ? (
          <LandingHero />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {activeTab === 'discover' && <Marketplace />}
            {activeTab === 'my-skills' && <MySkills />}
            {activeTab === 'create' && <CreateSkill />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-6 sm:py-8 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs sm:text-sm text-gray-600 font-mono">
            Requested by <span className="text-gray-500">@usiclabs</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
