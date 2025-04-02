
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email")
      return
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    setStatus("loading")
    setError("")

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setStatus("success")
    // In real app, we'd store this in a database
    localStorage.setItem("waitlistEmail", email)
  }

  return (
    <div className="mx-auto max-w-md w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full ${error ? 'border-red-500' : ''}`}
            disabled={status !== "idle"}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {error}
            </motion.p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                type="submit"
                className="w-full"
              >
                Join the Waitlist
              </Button>
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                disabled
                className="w-full"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </Button>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-2 text-green-500">
                <Check className="h-5 w-5" />
                <span>You're on the list!</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                We'll notify you when we launch.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}