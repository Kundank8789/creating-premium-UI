import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LiveCountersProps { deterministic?: boolean }

const LiveCounters: React.FC<LiveCountersProps> = ({ deterministic = false }) => {
  const [viewing, setViewing] = useState<number>(120)
  const [sold, setSold] = useState<number>(34)

  useEffect(() => {
    const t = setInterval(() => {
      if (deterministic) {
        setViewing(v => v + 1)
        setSold(s => s + (s % 10 === 0 ? 1 : 0))
      } else {
        setViewing(v => Math.max(1, v + Math.floor(Math.random() * 3 - 1)))
        setSold(s => s + (Math.random() > 0.96 ? 1 : 0))
      }
    }, 2200)
    return () => clearInterval(t)
  }, [deterministic])

  return (
    <div className="flex gap-4 items-center">
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, -1.5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="p-3 rounded-xl bg-amber-50 border border-amber-100 min-w-[110px]"
      >
        <div className="text-xs text-gray-500">Viewing now</div>
        <motion.div
          key={viewing}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="font-bold text-lg tabular-nums"
        >
          {viewing}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        className="p-3 rounded-xl bg-white border min-w-[140px]"
      >
        <div className="text-xs text-gray-500">Sold recently</div>
        <motion.div
          key={sold}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="font-bold text-lg tabular-nums"
        >
          {sold}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LiveCounters
