
import React, { useState } from 'react'
import { Heart, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AftercareCompanion() {
  const [active, setActive] = useState('home')
  const tabs = [
    { id: 'home', icon: Heart, label: 'Home' },
    { id: 'progress', icon: CheckCircle, label: 'Progress' },
    { id: 'alerts', icon: AlertCircle, label: 'Alerts' },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Aftercare Companion</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-3 gap-6"
      >
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex flex-col items-center p-4 rounded-2xl shadow-md w-28 transition ${
              active === id ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <Icon className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}
