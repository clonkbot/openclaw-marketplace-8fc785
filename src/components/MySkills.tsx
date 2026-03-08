import { useState } from 'react'
import { useAccount } from 'wagmi'

interface OwnedSkill {
  id: string
  name: string
  icon: string
  gradient: string
  creditsRemaining: number
  totalEarned: string
  callsReceived: number
  isOwned: boolean
}

const mockOwnedSkills: OwnedSkill[] = [
  {
    id: '1',
    name: 'GPT-4 Vision Analyzer',
    icon: '👁️',
    gradient: 'from-purple-500 to-pink-500',
    creditsRemaining: 423,
    totalEarned: '0',
    callsReceived: 0,
    isOwned: false,
  },
  {
    id: '2',
    name: 'Smart Data Extractor',
    icon: '📊',
    gradient: 'from-cyan-500 to-blue-500',
    creditsRemaining: 891,
    totalEarned: '0',
    callsReceived: 0,
    isOwned: false,
  },
]

const mockCreatedSkills: OwnedSkill[] = [
  {
    id: '10',
    name: 'Custom Code Reviewer',
    icon: '🔍',
    gradient: 'from-emerald-500 to-teal-500',
    creditsRemaining: 0,
    totalEarned: '1.847',
    callsReceived: 18470,
    isOwned: true,
  },
  {
    id: '11',
    name: 'API Response Parser',
    icon: '⚙️',
    gradient: 'from-amber-500 to-orange-500',
    creditsRemaining: 0,
    totalEarned: '0.562',
    callsReceived: 5620,
    isOwned: true,
  },
]

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function MySkills() {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState<'purchased' | 'created'>('purchased')

  const totalEarnings = mockCreatedSkills.reduce(
    (acc, skill) => acc + parseFloat(skill.totalEarned),
    0
  )
  const totalCalls = mockCreatedSkills.reduce(
    (acc, skill) => acc + skill.callsReceived,
    0
  )

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header with Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <span className="text-gray-400 text-sm">Total Earnings</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {totalEarnings.toFixed(3)} <span className="text-base sm:text-lg text-gray-400">ETH</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <span className="text-gray-400 text-sm">Skill Calls Received</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {formatNumber(totalCalls)}
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1 p-5 sm:p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <span className="text-gray-400 text-sm">Active Skills</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {mockOwnedSkills.length + mockCreatedSkills.length}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('purchased')}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'purchased'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Purchased ({mockOwnedSkills.length})
        </button>
        <button
          onClick={() => setActiveTab('created')}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'created'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Created ({mockCreatedSkills.length})
        </button>
      </div>

      {/* Skills List */}
      {activeTab === 'purchased' ? (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">
            Skills you have purchased credits for. Your agent can call these endpoints.
          </p>
          {mockOwnedSkills.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockOwnedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 sm:p-5 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${skill.gradient} rounded-xl flex items-center justify-center text-2xl`}
                    >
                      {skill.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white truncate text-sm sm:text-base">{skill.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                        Active
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div>
                      <div className="text-xs text-gray-500">Credits Remaining</div>
                      <div className="text-lg sm:text-xl font-bold text-emerald-400">{skill.creditsRemaining}</div>
                    </div>
                    <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/30 transition-colors">
                      Top Up
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-white/[0.02] rounded-2xl border border-white/5">
              <div className="text-4xl sm:text-5xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No purchased skills yet</h3>
              <p className="text-gray-500 mb-6 text-sm sm:text-base">Browse the marketplace to find skills for your agents</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">
            Skills you have created and published. You earn ETH every time an agent calls your skill.
          </p>
          {mockCreatedSkills.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {mockCreatedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 sm:p-6 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${skill.gradient} rounded-xl flex items-center justify-center text-xl sm:text-2xl`}
                      >
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm sm:text-base">{skill.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                          Live & Earning
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 bg-emerald-500/10 rounded-xl">
                      <div className="text-xs text-gray-400 mb-1">Total Earned</div>
                      <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">
                        {skill.totalEarned} ETH
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                      <div className="text-xs text-gray-400 mb-1">Calls Received</div>
                      <div className="text-lg sm:text-xl font-bold text-white">
                        {formatNumber(skill.callsReceived)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2.5 bg-white/5 text-gray-300 rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors">
                      View Analytics
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl text-xs sm:text-sm font-medium hover:bg-emerald-500/30 transition-colors">
                      Withdraw
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-white/[0.02] rounded-2xl border border-white/5">
              <div className="text-4xl sm:text-5xl mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No skills created yet</h3>
              <p className="text-gray-500 mb-6 text-sm sm:text-base">Create your first skill and start earning</p>
            </div>
          )}
        </div>
      )}

      {/* Wallet Info */}
      <div className="mt-8 p-4 sm:p-6 bg-white/[0.02] rounded-2xl border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Connected Wallet</div>
            <div className="font-mono text-emerald-400 text-sm sm:text-base">
              {address?.slice(0, 10)}...{address?.slice(-8)}
            </div>
          </div>
          <button className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-black text-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all">
            Export Activity
          </button>
        </div>
      </div>
    </div>
  )
}
