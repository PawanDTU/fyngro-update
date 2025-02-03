"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

const DynamicPie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), { ssr: false })

export default function Calculator() {
  const [activeCalculator, setActiveCalculator] = useState("emi")
  const [emiResult, setEmiResult] = useState<number | null>(null)
  const [netWorthResult, setNetWorthResult] = useState<number | null>(null)
  const [sipResult, setSipResult] = useState<number | null>(null)
  const [fdResult, setFdResult] = useState<number | null>(null)
  const [spendingData] = useState({
    labels: ["Food", "Housing", "Transportation", "Entertainment", "Other"],
    datasets: [
      {
        data: [300, 1000, 200, 100, 400],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  })

  const calculateEMI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      principal: { value: string }
      rate: { value: string }
      time: { value: string }
    }
    const principal = Number.parseFloat(target.principal.value)
    const rate = Number.parseFloat(target.rate.value) / 100 / 12
    const time = Number.parseFloat(target.time.value) * 12
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
    setEmiResult(Number.parseFloat(emi.toFixed(2)))
  }

  const calculateNetWorth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      assets: { value: string }
      liabilities: { value: string }
    }
    const assets = Number.parseFloat(target.assets.value)
    const liabilities = Number.parseFloat(target.liabilities.value)
    const netWorth = assets - liabilities
    setNetWorthResult(Number.parseFloat(netWorth.toFixed(2)))
  }

  const calculateSIP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      monthly: { value: string }
      rate: { value: string }
      years: { value: string }
    }
    const monthly = Number.parseFloat(target.monthly.value)
    const rate = Number.parseFloat(target.rate.value) / 100 / 12
    const years = Number.parseFloat(target.years.value)
    const n = years * 12
    const sip = monthly * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate)
    setSipResult(Number.parseFloat(sip.toFixed(2)))
  }

  const calculateFD = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      principal: { value: string }
      rate: { value: string }
      time: { value: string }
    }
    const principal = Number.parseFloat(target.principal.value)
    const rate = Number.parseFloat(target.rate.value) / 100
    const time = Number.parseFloat(target.time.value)
    const fd = principal * Math.pow(1 + rate, time)
    setFdResult(Number.parseFloat(fd.toFixed(2)))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Financial Calculators
      </motion.h1>
      <div className="mb-8">
        <button
          className={`mr-4 ${activeCalculator === "emi" ? "font-bold" : ""}`}
          onClick={() => setActiveCalculator("emi")}
        >
          EMI Calculator
        </button>
        <button
          className={`mr-4 ${activeCalculator === "netWorth" ? "font-bold" : ""}`}
          onClick={() => setActiveCalculator("netWorth")}
        >
          Net Worth Calculator
        </button>
        <button
          className={`mr-4 ${activeCalculator === "spending" ? "font-bold" : ""}`}
          onClick={() => setActiveCalculator("spending")}
        >
          Spending Calculator
        </button>
        <button
          className={`mr-4 ${activeCalculator === "sip" ? "font-bold" : ""}`}
          onClick={() => setActiveCalculator("sip")}
        >
          SIP Calculator
        </button>
        <button
          className={`mr-4 ${activeCalculator === "fd" ? "font-bold" : ""}`}
          onClick={() => setActiveCalculator("fd")}
        >
          FD Calculator
        </button>
      </div>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {activeCalculator === "emi" && (
          <form onSubmit={calculateEMI}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principal">
                Principal Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="principal"
                type="number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
                Interest Rate (%)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rate"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                Time (in years)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                type="number"
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Calculate EMI
            </button>
            {emiResult && <p className="mt-4">Your EMI is: ₹{emiResult}</p>}
          </form>
        )}
        {activeCalculator === "netWorth" && (
          <form onSubmit={calculateNetWorth}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assets">
                Total Assets
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="assets"
                type="number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="liabilities">
                Total Liabilities
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="liabilities"
                type="number"
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Calculate Net Worth
            </button>
            {netWorthResult && <p className="mt-4">Your Net Worth is: ₹{netWorthResult}</p>}
          </form>
        )}
        {activeCalculator === "spending" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Category-wise Spending</h2>
            <div className="w-full max-w-md mx-auto">
              <DynamicPie data={spendingData} />
            </div>
          </div>
        )}
        {activeCalculator === "sip" && (
          <form onSubmit={calculateSIP}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monthly">
                Monthly Investment
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="monthly"
                type="number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
                Expected Annual Return Rate (%)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rate"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="years">
                Investment Period (in years)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="years"
                type="number"
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Calculate SIP
            </button>
            {sipResult && <p className="mt-4">Your SIP Maturity Value is: ₹{sipResult}</p>}
          </form>
        )}
        {activeCalculator === "fd" && (
          <form onSubmit={calculateFD}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principal">
                Principal Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="principal"
                type="number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
                Annual Interest Rate (%)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rate"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                Time (in years)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                type="number"
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Calculate FD
            </button>
            {fdResult && <p className="mt-4">Your FD Maturity Value is: ₹{fdResult}</p>}
          </form>
        )}
      </motion.div>
    </div>
  )
}

