import React from 'react'

interface Props {
  title: string
  rating: number
  excerpt: string
  name: string
  size: string
  date: string
}

const ReviewCard: React.FC<Props> = ({ title, rating, excerpt, name, size, date }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft-lg p-6 transition-transform duration-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-100/70">
      <h4 className="text-xl font-semibold text-amber-700">{title}</h4>
      <div className="mt-2 text-amber-400 text-sm">
        {Array.from({ length: rating }).map((_, i) => '★')}
      </div>
      <p className="mt-4 text-gray-600 italic text-sm leading-relaxed">"{excerpt}"</p>
      <button className="text-amber-600 font-semibold mt-3 inline-block text-sm hover:underline">
        Read more ↓
      </button>

      <div className="mt-6 border-t pt-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-gray-500">{date} • India</div>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-100 text-xs font-medium">
          {size}
        </div>
      </div>

      <div className="mt-4 flex gap-3 text-xs">
        <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
          Like
        </button>
        <button className="px-4 py-2 rounded-full bg-green-400 text-white hover:bg-green-500">
          Helpful
        </button>
        <button className="px-4 py-2 rounded-full bg-blue-400 text-white hover:bg-blue-500">
          Share
        </button>
      </div>
    </div>
  )
}

export default ReviewCard
