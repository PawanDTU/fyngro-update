// "use client"

// import Link from "next/link"
// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronDown, Settings } from "lucide-react"
// import { useRouter } from "next/navigation"

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
//   const router = useRouter()

//   const toggleDropdown = (dropdown: string) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
//   }

//   const handleLogout = () => {
//     // Implement logout logic here (e.g., clear local storage, reset state)
//     // For now, we'll just redirect to the home page
//     router.push("/")
//   }

//   const navItems = [
//     {
//       title: "Learn",
//       items: ["Basics of Personal Finance", "Investing", "Entrepreneurship", "Taxation"],
//     },
//     {
//       title: "Explore",
//       items: ["Calculator", "News", "Budget", "Trending"],
//     },
//     {
//       title: "My Account",
//       items: ["Dashboard", "Profile", "Settings", "Logout"],
//     },
//   ]

//   return (
//     <nav className="bg-blue-600 p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-white text-2xl font-bold">
//           Fyngro
//         </Link>
//         <div className="hidden md:flex space-x-4">
//           {navItems.map((item) => (
//             <div key={item.title} className="relative group">
//               <button
//                 className="text-white hover:text-blue-200 py-2 flex items-center"
//                 onClick={() => toggleDropdown(item.title)}
//               >
//                 {item.title}
//                 <ChevronDown className="ml-1 h-4 w-4" />
//               </button>
//               <AnimatePresence>
//                 {activeDropdown === item.title && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-blue-500 ring-1 ring-black ring-opacity-5 divide-y divide-blue-400 focus:outline-none"
//                   >
//                     <div className="py-1 max-h-60 overflow-y-auto">
//                       {item.items.map((subItem) => (
//                         <Link
//                           key={subItem}
//                           href={subItem === "Logout" ? "#" : `/${subItem.toLowerCase().replace(/\s+/g, "-")}`}
//                           className="block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:text-white"
//                           onClick={subItem === "Logout" ? handleLogout : undefined}
//                         >
//                           {subItem}
//                         </Link>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//         <Link href="/settings" className="text-white hover:text-blue-200">
//           <Settings className="h-6 w-6" />
//         </Link>
//         <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
//           Menu
//         </button>
//       </div>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden bg-blue-500 p-4"
//           >
//             {navItems.map((item) => (
//               <div key={item.title} className="py-2">
//                 <button
//                   className="text-white font-semibold w-full text-left flex justify-between items-center"
//                   onClick={() => toggleDropdown(item.title)}
//                 >
//                   {item.title}
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//                 <AnimatePresence>
//                   {activeDropdown === item.title && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="mt-2 pl-4 bg-blue-600 rounded-md"
//                     >
//                       {item.items.map((subItem) => (
//                         <Link
//                           key={subItem}
//                           href={subItem === "Logout" ? "#" : `/${subItem.toLowerCase().replace(/\s+/g, "-")}`}
//                           className="block text-white py-2 px-4 hover:bg-blue-700"
//                           onClick={subItem === "Logout" ? handleLogout : undefined}
//                         >
//                           {subItem}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//             <Link href="/settings" className="block text-white py-2 px-4 hover:bg-blue-700">
//               Settings
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   )
// }

// export default Navigation

"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const router = useRouter()

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const handleLogout = () => {
    // Implement logout logic here
    router.push("/")
  }

  const navItems = [
    {
      title: "Learn",
      items: [
        { name: "Basics of Personal Finance", path: "/learn/basics" },
        { name: "Investing", path: "/learn/investing" },
        { name: "Entrepreneurship", path: "/learn/entrepreneurship" },
        { name: "Taxation", path: "/learn/taxation" },
      ],
    },
    {
      title: "Explore",
      items: [
        { name: "Calculator", path: "/calculator" },
        { name: "News", path: "/news" },
        { name: "Budget", path: "/budget" },
        { name: "Trending", path: "/trending" },
      ],
    },
    {
      title: "My Account",
      items: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Profile", path: "/profile" },
        { name: "Settings", path: "/settings" },
        { name: "Logout", path: "#" },
      ],
    },
  ]

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Fyngro
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <div
              key={item.title}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-white hover:text-blue-200 py-2 flex items-center">
                {item.title}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-blue-500 ring-1 ring-black ring-opacity-5 divide-y divide-blue-400 focus:outline-none"
                  >
                    <div className="py-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.name === "Logout" ? "#" : subItem.path}
                          className="block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:text-white"
                          onClick={subItem.name === "Logout" ? handleLogout : undefined}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <Link href="/settings" className="text-white hover:text-blue-200">
          <Settings className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  )
}

export default Navigation