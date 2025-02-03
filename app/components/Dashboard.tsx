"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Doughnut, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const overviewData = {
    balance: 10000,
    investments: 5000,
    monthlyBudget: 2000,
    savings: 3000,
  }

  const investmentData = {
    labels: ["Stocks", "Bonds", "Real Estate", "Crypto"],
    datasets: [
      {
        data: [3000, 1500, 500, 1000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  }

  const budgetData = {
    labels: ["Housing", "Food", "Transportation", "Entertainment", "Savings"],
    datasets: [
      {
        data: [800, 400, 200, 100, 500],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  }

  const savingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Savings",
        data: [1000, 1500, 2000, 2200, 2700, 3000],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
      <div className="flex mb-6 bg-white rounded-lg p-2">
        <button
          className={`mr-4 px-4 py-2 rounded-full ${activeTab === "overview" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded-full ${activeTab === "investments" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("investments")}
        >
          Investments
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded-full ${activeTab === "budget" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("budget")}
        >
          Budget
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === "savings" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("savings")}
        >
          Savings
        </button>
      </div>
      <MotionDiv
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Financial Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Current Balance</p>
                <p className="text-2xl text-blue-600">${overviewData.balance.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Total Investments</p>
                <p className="text-2xl text-green-600">${overviewData.investments.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Monthly Budget</p>
                <p className="text-2xl text-yellow-600">${overviewData.monthlyBudget.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Total Savings</p>
                <p className="text-2xl text-purple-600">${overviewData.savings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "investments" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Investments</h2>
            <div className="w-full max-w-md mx-auto">
              <Doughnut data={investmentData} />
            </div>
          </div>
        )}
        {activeTab === "budget" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Monthly Budget</h2>
            <div className="w-full max-w-md mx-auto">
              <Doughnut data={budgetData} />
            </div>
          </div>
        )}
        {activeTab === "savings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Savings Growth</h2>
            <div className="w-full max-w-2xl mx-auto">
              <Line
                data={savingsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                    title: {
                      display: true,
                      text: "Savings Over Time",
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </MotionDiv>
    </div>
  )
}

