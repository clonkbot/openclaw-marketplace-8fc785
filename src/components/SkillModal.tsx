import { useState } from 'react'
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { Skill } from './SkillCard'

interface SkillModalProps {
  skill: Skill
  onClose: () => void
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

export function SkillModal({ skill, onClose }: SkillModalProps) {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const [callCount, setCallCount] = useState(100)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const totalCost = parseFloat(skill.pricePerCall) * callCount
  const hasEnoughBalance = balance && parseFloat(formatEther(balance.value)) >= totalCost

  const handlePurchase = async () => {
    setIsSubscribing(true)
    try {
      // In production, this would call the actual x402 skill registry contract
      // For demo purposes, we simulate a purchase intent
      writeContract({
        address: '0x0000000000000000000000000000000000000000',
        abi: [{
          name: 'purchaseCredits',
          type: 'function',
          stateMutability: 'payable',
          inputs: [
            { name: 'skillId', type: 'bytes32' },
            { name: 'credits', type: 'uint256' }
          ],
          outputs: []
        }],
        functionName: 'purchaseCredits',
        args: [skill.id as `0x${string}`, BigInt(callCount)],
        value: parseEther(totalCost.toString()),
      })
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-xl max-h-[90vh] overflow-y-auto bg-[#12121a] rounded-t-3xl sm:rounded-2xl border-t sm:border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-colors z-10"
        >
          ✕
        </button>

        {/* Drag indicator (mobile) */}
        <div className="sm:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-2" />

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/5">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${skill.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0`}
            >
              {skill.icon}
            </div>
            <div className="min-w-0 flex-1 pr-8">
              <h2 className="text-xl sm:text-2xl font-['Space_Grotesk'] font-bold text-white">
                {skill.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium">
                  {skill.category}
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  by {skill.creator.slice(0, 6)}...{skill.creator.slice(-4)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              About
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{skill.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
              <div className="text-lg sm:text-2xl font-bold text-emerald-400 font-mono">
                {skill.pricePerCall}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">ETH / call</div>
            </div>
            <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
              <div className="text-lg sm:text-2xl font-bold text-white">
                {formatNumber(skill.totalCalls)}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Total Calls</div>
            </div>
            <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
              <div className="text-lg sm:text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                <span className="text-sm sm:text-lg">★</span> {skill.rating}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Rating</div>
            </div>
          </div>

          {/* Endpoint */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              x402 Endpoint
            </h3>
            <div className="flex items-center gap-2 p-3 bg-black/30 rounded-xl border border-white/10">
              <code className="text-emerald-400 font-mono text-xs sm:text-sm flex-1 truncate">
                {skill.endpoint}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(skill.endpoint)}
                className="px-2.5 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/30 transition-colors flex-shrink-0"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Purchase Credits */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20">
            <h3 className="text-sm font-semibold text-white mb-4">Purchase Call Credits</h3>

            {/* Call Count Selector */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <button
                onClick={() => setCallCount(Math.max(10, callCount - 100))}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors text-lg font-bold"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={callCount}
                  onChange={(e) => setCallCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-transparent text-center text-xl sm:text-2xl font-bold text-white focus:outline-none"
                />
                <div className="text-xs sm:text-sm text-gray-500">calls</div>
              </div>
              <button
                onClick={() => setCallCount(callCount + 100)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors text-lg font-bold"
              >
                +
              </button>
            </div>

            {/* Quick Select */}
            <div className="flex gap-2 mb-4">
              {[100, 500, 1000, 5000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCallCount(amount)}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    callCount === amount
                      ? 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>

            {/* Total Cost */}
            <div className="flex items-center justify-between py-3 border-t border-white/10">
              <span className="text-gray-400 text-sm">Total Cost</span>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {totalCost.toFixed(6)}
                </span>
                <span className="text-gray-400 ml-2">ETH</span>
              </div>
            </div>

            {/* Balance Check */}
            {balance && (
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                <span>Your Balance</span>
                <span className={hasEnoughBalance ? 'text-emerald-400' : 'text-red-400'}>
                  {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
                </span>
              </div>
            )}

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={isPending || isConfirming || !hasEnoughBalance}
              className={`w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                !hasEnoughBalance
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : isPending || isConfirming
                  ? 'bg-emerald-500/50 text-white cursor-wait'
                  : isSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02]'
              }`}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Confirm in Wallet...
                </span>
              ) : isConfirming ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Confirming...
                </span>
              ) : isSuccess ? (
                '✓ Credits Purchased!'
              ) : !hasEnoughBalance ? (
                'Insufficient Balance'
              ) : (
                `Purchase ${callCount} Credits`
              )}
            </button>

            {isSuccess && hash && (
              <a
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs sm:text-sm text-emerald-400 mt-3 hover:underline"
              >
                View on BaseScan →
              </a>
            )}
          </div>

          {/* Integration Code */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Quick Integration
            </h3>
            <pre className="p-4 bg-black/50 rounded-xl border border-white/10 overflow-x-auto text-[10px] sm:text-xs">
              <code className="text-gray-300">
{`// x402 payment-aware fetch
const response = await fetch('${skill.endpoint}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-402-Payment': walletSignature
  },
  body: JSON.stringify({ input: yourData })
});`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
