
import React, { useState, useRef, useEffect } from 'react'
import { Send, Moon, Sun, Scroll, Book, Landmark, Library } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"

const teamMembers = [
  { name: 'Syed Nabi', role: '160923737146', icon: Scroll },
  { name: 'Md Ibrahim Sharif', role: '160923737174', icon: Book },
  { name: 'Abdul Mateen', role: '160923737134', icon: Landmark },
  { name: 'Syed Abdul Bari', role: '160923737121', icon: Library }
]

const genAI = new GoogleGenerativeAI("AIzaSyBLDpQJwWGBmEdTbmT6TT9K_uICaJf5v48")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
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

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev
      localStorage.setItem('darkMode', newMode)
      if (newMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return newMode
    })
  }

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div className="dark:bg-gray-900">
      <div className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
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
            <div className="w-48 p-4 rounded-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-amber-200 dark:border-amber-900 shadow-lg">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <member.icon className="w-8 h-8 text-amber-800 dark:text-amber-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100">{member.name}</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400">{member.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Chat Container */}
        <div className="w-full max-w-2xl mx-auto my-8">
          <div className="backdrop-blur-sm bg-[#FDF5E6]/90 dark:bg-gray-800/80 rounded-xl shadow-xl overflow-hidden border border-amber-200 dark:border-amber-900">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-900 dark:to-orange-900">
              <div className="flex items-center gap-2">
                <Scroll className="w-6 h-6 text-amber-100 animate-pulse" />
                <h2 className="text-2xl font-bold text-amber-100 font-serif">HistoryBot</h2>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-6 h-6 text-amber-100" />
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-amber-100/20 hover:bg-amber-100/30 text-amber-100 transition-colors duration-200"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            <div className="p-4 h-[60vh] overflow-y-auto bg-[#FDF5E6]/50 dark:bg-gray-900/40">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-amber-700 dark:bg-amber-800 flex items-center justify-center text-amber-100 mr-2">
                      <Scroll size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-amber-700 text-amber-100'
                        : 'bg-[#FDF5E6] dark:bg-gray-700 text-amber-900 dark:text-amber-100'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-amber-600 dark:bg-amber-700 flex items-center justify-center text-amber-100 ml-2">
                      U
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-[#FDF5E6]/60 dark:bg-gray-800/60 border-t border-amber-200 dark:border-amber-900">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about history..."
                  className="flex-grow p-3 rounded-lg bg-white dark:bg-gray-700 text-amber-900 dark:text-amber-100 placeholder-amber-400 dark:placeholder-amber-300 border border-amber-200 dark:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-amber-100 transition-colors duration-200"
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

