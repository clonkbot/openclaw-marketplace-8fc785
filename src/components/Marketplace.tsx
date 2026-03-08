import { useState } from 'react'
import { useAccount } from 'wagmi'
import { SkillCard, Skill } from './SkillCard'
import { SkillModal } from './SkillModal'

const categories = ['All', 'Vision', 'Language', 'Data', 'Crypto', 'Audio', 'Code']

const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'GPT-4 Vision Analyzer',
    description: 'Powerful image analysis and description using state-of-the-art vision models. Extract text, describe scenes, identify objects, and more.',
    creator: '0x7a3f8c2d4e5b6a9f1c3d5e7b8a2c4f6d8e0b2a4c',
    category: 'Vision',
    pricePerCall: '0.0001',
    totalCalls: 847234,
    rating: 4.9,
    endpoint: 'https://api.openclaw.xyz/skills/vision-analyzer',
    icon: '👁️',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: '2',
    name: 'Smart Data Extractor',
    description: 'Extract structured data from unstructured text, PDFs, and images. Returns JSON with high accuracy.',
    creator: '0x2b8e1a4f7c9d3e5f8a2b4c6d8e0f1a3b5c7d9e1f',
    category: 'Data',
    pricePerCall: '0.0002',
    totalCalls: 423891,
    rating: 4.8,
    endpoint: 'https://api.openclaw.xyz/skills/data-extractor',
    icon: '📊',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: '3',
    name: 'Crypto Transaction Signer',
    description: 'Secure multi-chain transaction signing and verification. Supports EVM chains, Solana, and more.',
    creator: '0x9c1d5e7b3a2f4c6d8e0b1a3c5f7d9e2b4a6c8d0e',
    category: 'Crypto',
    pricePerCall: '0.0005',
    totalCalls: 198456,
    rating: 5.0,
    endpoint: 'https://api.openclaw.xyz/skills/crypto-signer',
    icon: '🔐',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: '4',
    name: 'Code Generator Pro',
    description: 'Generate production-ready code in 20+ languages. Includes tests, documentation, and best practices.',
    creator: '0x4f6d8e0b2a4c6f8d0a2c4e6b8f0a2d4c6e8b0a2c',
    category: 'Code',
    pricePerCall: '0.0003',
    totalCalls: 562178,
    rating: 4.7,
    endpoint: 'https://api.openclaw.xyz/skills/code-gen',
    icon: '💻',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: '5',
    name: 'Speech-to-Text Elite',
    description: 'High-accuracy speech recognition with speaker diarization. 100+ languages supported.',
    creator: '0x8b0a2c4e6f8d0a2c4e6b8f0a2d4c6e8b0a2c4e6f',
    category: 'Audio',
    pricePerCall: '0.0002',
    totalCalls: 334892,
    rating: 4.6,
    endpoint: 'https://api.openclaw.xyz/skills/speech-to-text',
    icon: '🎤',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    id: '6',
    name: 'Sentiment Analyzer',
    description: 'Deep sentiment analysis with emotion detection, sarcasm recognition, and confidence scores.',
    creator: '0x1a3c5e7d9b0f2a4c6e8d0b2f4a6c8e0d2b4f6a8c',
    category: 'Language',
    pricePerCall: '0.00008',
    totalCalls: 1234567,
    rating: 4.8,
    endpoint: 'https://api.openclaw.xyz/skills/sentiment',
    icon: '🧠',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: '7',
    name: 'NFT Metadata Parser',
    description: 'Parse and validate NFT metadata across all major standards. ERC-721, ERC-1155, and more.',
    creator: '0x5e7d9b0f2a4c6e8d0b2f4a6c8e0d2b4f6a8c0e2d',
    category: 'Crypto',
    pricePerCall: '0.00005',
    totalCalls: 892345,
    rating: 4.5,
    endpoint: 'https://api.openclaw.xyz/skills/nft-parser',
    icon: '🖼️',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    id: '8',
    name: 'Language Translator',
    description: 'Neural machine translation with context awareness. 150+ language pairs with dialect support.',
    creator: '0x9b0f2a4c6e8d0b2f4a6c8e0d2b4f6a8c0e2d4f6a',
    category: 'Language',
    pricePerCall: '0.0001',
    totalCalls: 678901,
    rating: 4.9,
    endpoint: 'https://api.openclaw.xyz/skills/translate',
    icon: '🌐',
    gradient: 'from-sky-500 to-cyan-500',
  },
]

export function Marketplace() {
  const { address } = useAccount()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'rating'>('popular')

  const filteredSkills = mockSkills
    .filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.totalCalls - a.totalCalls
      if (sortBy === 'price') return parseFloat(a.pricePerCall) - parseFloat(b.pricePerCall)
      return b.rating - a.rating
    })

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-white">
            Discover Skills
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Find and integrate AI capabilities into your agents
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Wallet:</span>
          <span className="font-mono text-emerald-400">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'popular' | 'price' | 'rating')}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer"
        >
          <option value="popular">Most Popular</option>
          <option value="price">Lowest Price</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''}
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredSkills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onClick={() => setSelectedSkill(skill)}
            index={index}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No skills found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Skill Modal */}
      {selectedSkill && (
        <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}
    </div>
  )
}
