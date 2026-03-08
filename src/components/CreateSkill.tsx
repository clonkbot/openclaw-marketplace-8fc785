import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

interface SkillFormData {
  name: string
  description: string
  category: string
  pricePerCall: string
  endpoint: string
  icon: string
}

const categories = ['Vision', 'Language', 'Data', 'Crypto', 'Audio', 'Code', 'Other']
const icons = ['🧠', '👁️', '📊', '🔐', '🎤', '💻', '🌐', '⚡', '🎨', '🔍', '⚙️', '🚀', '💎', '🔮', '🛡️', '📡']

export function CreateSkill() {
  const { address } = useAccount()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    description: '',
    category: '',
    pricePerCall: '0.0001',
    endpoint: '',
    icon: '🧠',
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const isStep1Valid = formData.name.length >= 3 && formData.description.length >= 20
  const isStep2Valid = formData.category && formData.pricePerCall && parseFloat(formData.pricePerCall) > 0
  const isStep3Valid = formData.endpoint.startsWith('https://')

  const handlePublish = async () => {
    try {
      writeContract({
        address: '0x0000000000000000000000000000000000000000',
        abi: [{
          name: 'registerSkill',
          type: 'function',
          stateMutability: 'payable',
          inputs: [
            { name: 'name', type: 'string' },
            { name: 'endpoint', type: 'string' },
            { name: 'pricePerCall', type: 'uint256' }
          ],
          outputs: [{ name: 'skillId', type: 'bytes32' }]
        }],
        functionName: 'registerSkill',
        args: [formData.name, formData.endpoint, parseEther(formData.pricePerCall)],
        value: parseEther('0.001'), // Registration fee
      })
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-white mb-2">
          Create New Skill
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Publish your AI capability to the marketplace and earn from every call
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                step === s
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black'
                  : step > s
                  ? 'bg-emerald-500/30 text-emerald-400'
                  : 'bg-white/10 text-gray-500'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
            {s < 3 && (
              <div
                className={`w-8 sm:w-16 h-0.5 ${
                  step > s ? 'bg-emerald-500/50' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="p-5 sm:p-8 bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl border border-white/10">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Basic Information</h2>

            {/* Icon Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Choose Icon
              </label>
              <div className="grid grid-cols-8 gap-2">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`p-2 sm:p-3 rounded-xl text-xl sm:text-2xl transition-all ${
                      formData.icon === icon
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 scale-110'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Skill Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Advanced Image Analyzer"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.name.length}/50 characters (minimum 3)
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what your skill does, its capabilities, and use cases..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/500 characters (minimum 20)
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              className={`w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all ${
                isStep1Valid
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Pricing & Category</h2>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      formData.category === cat
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price per Call (ETH)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.00001"
                  min="0.00001"
                  value={formData.pricePerCall}
                  onChange={(e) => setFormData({ ...formData, pricePerCall: e.target.value })}
                  className="w-full px-4 py-3 pr-16 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-sm">
                  ETH
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['0.00005', '0.0001', '0.0002', '0.0005'].map((price) => (
                  <button
                    key={price}
                    type="button"
                    onClick={() => setFormData({ ...formData, pricePerCall: price })}
                    className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-400 hover:bg-white/10 transition-colors"
                  >
                    {price} ETH
                  </button>
                ))}
              </div>
            </div>

            {/* Revenue Estimate */}
            <div className="p-4 sm:p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <h3 className="text-sm font-semibold text-emerald-400 mb-3">Revenue Estimate</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-sm sm:text-lg font-bold text-white">
                    {(parseFloat(formData.pricePerCall || '0') * 1000).toFixed(4)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500">1K calls</div>
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-bold text-white">
                    {(parseFloat(formData.pricePerCall || '0') * 10000).toFixed(3)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500">10K calls</div>
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-bold text-white">
                    {(parseFloat(formData.pricePerCall || '0') * 100000).toFixed(2)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500">100K calls</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 sm:py-4 rounded-xl font-bold bg-white/10 text-gray-300 hover:bg-white/20 transition-all text-sm sm:text-base"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!isStep2Valid}
                className={`flex-1 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all ${
                  isStep2Valid
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">x402 Endpoint</h2>

            {/* Endpoint URL */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                API Endpoint URL
              </label>
              <input
                type="url"
                value={formData.endpoint}
                onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                placeholder="https://api.yourservice.com/skill"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be HTTPS and return x402 payment-required responses
              </p>
            </div>

            {/* x402 Info */}
            <div className="p-4 sm:p-5 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <span>⚡</span> x402 Protocol Requirements
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  Return 402 Payment Required for unauthorized requests
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  Include payment address in X-402-Payment-Address header
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  Verify signed payments via on-chain registry
                </li>
              </ul>
            </div>

            {/* Preview */}
            <div className="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Preview</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl">
                  {formData.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm sm:text-base">{formData.name || 'Skill Name'}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-emerald-400">{formData.pricePerCall} ETH/call</span>
                    <span>•</span>
                    <span>{formData.category || 'Category'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Fee */}
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-amber-400 text-sm">Registration Fee</span>
              <span className="font-mono text-white font-bold">0.001 ETH</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 sm:py-4 rounded-xl font-bold bg-white/10 text-gray-300 hover:bg-white/20 transition-all text-sm sm:text-base"
              >
                ← Back
              </button>
              <button
                onClick={handlePublish}
                disabled={!isStep3Valid || isPending || isConfirming}
                className={`flex-1 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all ${
                  !isStep3Valid || isPending || isConfirming
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                    : isSuccess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                }`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">Confirm in Wallet</span>
                    <span className="sm:hidden">Confirming...</span>
                  </span>
                ) : isConfirming ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing...
                  </span>
                ) : isSuccess ? (
                  '✓ Published!'
                ) : (
                  'Publish Skill'
                )}
              </button>
            </div>

            {isSuccess && hash && (
              <div className="text-center">
                <a
                  href={`https://basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 text-sm hover:underline"
                >
                  View on BaseScan →
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Creator Address */}
      <div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
        Publishing as{' '}
        <span className="font-mono text-gray-500">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
    </div>
  )
}
