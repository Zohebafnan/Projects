'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Moon, Sun, Dna, Microscope, Brain, FlaskRoundIcon as Flask, Leaf } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"

const teamMembers = [
  { name: 'Syed Ghyas Ahmed', role: '160923737138', icon: Brain },
  { name: 'Khaja Sulaimman', role: '160923737170', icon: Flask },
  { name: 'Mohd Saifullah', role: '160923737139', icon: Leaf },
  { name: 'Mohd Ali', role: '160923737137', icon: Microscope }
]

const genAI = new GoogleGenerativeAI("AIzaSyBLDpQJwWGBmEdTbmT6TT9K_uICaJf5v48")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })
  const messagesEndRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      
      try {
        const result = await model.generateContent(input)
        const response = await result.response.text()
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response 
        }])
      } catch (error) {
        console.error('Error:', error)
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }])
      }
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode)
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [isDarkMode])

  // Initialize dark mode on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    if (savedDarkMode) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div className="dark:bg-gray-900">
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
        {/* Team Member Cards */}
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            className={`fixed ${
              index === 0 ? 'top-4 left-4' :
              index === 1 ? 'top-4 right-4' :
              index === 2 ? 'bottom-4 left-4' :
              'bottom-4 right-4'
            }`}
          >
            <div className="w-48 p-4 rounded-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-teal-200 dark:border-teal-900 shadow-lg">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                  <member.icon className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Chat Container */}
        <div className="w-full max-w-2xl mx-auto my-8">
          <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-xl overflow-hidden border border-teal-200 dark:border-teal-900">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-500 to-green-500 dark:from-teal-900 dark:to-green-900">
              <div className="flex items-center gap-2">
                <Dna className="w-6 h-6 text-white animate-pulse" />
                <h2 className="text-2xl font-bold text-white">BioBot</h2>
              </div>
              <div className="flex items-center gap-2">
                <Microscope className="w-6 h-6 text-white" />
                <button
                  onClick={() => setIsDarkMode(prev => !prev)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            <div className="p-4 h-[60vh] overflow-y-auto bg-white/40 dark:bg-gray-900/40">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-teal-500 dark:bg-teal-700 flex items-center justify-center text-white mr-2">
                      <Dna size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-green-400 dark:bg-green-700 flex items-center justify-center text-white ml-2">
                      U
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white/60 dark:bg-gray-800/60 border-t border-teal-200 dark:border-teal-900">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about biology..."
                  className="flex-grow p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-teal-200 dark:border-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                />
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white transition-colors duration-200"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

