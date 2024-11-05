'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Menu, X } from 'lucide-react'
import {Poppins,Lexend_Deca} from "next/font/google"

const lex = Lexend_Deca({
    weight: ["100","400","700"],
    style: 'normal',
    display: 'swap',
    subsets: ['latin']
})

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  }

  return (
    <nav className="fixed z-50 w-full border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-black p-1.5"
            >
              <Code className="h-6 w-6 text-white" />
            </motion.div>
            <span className={`text-2xl  text-gray-700 ${lex.className}`}>
              Kodacity
            </span>
          </Link>

          <div className="hidden items-center space-x-5 md:flex">
            {/* {['Features', 'Pricing', 'About'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  {item}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              </Link>
            ))} */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              Log in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-black px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-800"
            >
              Sign up
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 bg-white md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {["Features", "Pricing", "About"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
                onClick={toggleMenu}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="block rounded-md bg-black px-3 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                onClick={toggleMenu}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
