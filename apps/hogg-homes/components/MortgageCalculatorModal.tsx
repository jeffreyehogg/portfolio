'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, Calendar } from 'lucide-react'

interface MortgageCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  initialPrice?: number
  onOpenTourDrawer: () => void
}

export default function MortgageCalculatorModal({
  isOpen,
  onClose,
  initialPrice = 349900,
  onOpenTourDrawer,
}: MortgageCalculatorModalProps) {
  const [homePrice, setHomePrice] = useState<number>(initialPrice)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20)
  const [interestRate, setInterestRate] = useState<number>(4.99) // Special Builder Promo
  const [loanTermYears, setLoanTermYears] = useState<number>(30)
  const taxRatePercent = 2.14 // Texas average
  const monthlyInsurance = 135
  const monthlyHoa = 65

  // Calculations
  const downPaymentAmount = useMemo(
    () => Math.round((homePrice * downPaymentPercent) / 100),
    [homePrice, downPaymentPercent]
  )
  const loanAmount = useMemo(() => homePrice - downPaymentAmount, [homePrice, downPaymentAmount])

  const monthlyPrincipalInterest = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12
    const totalPayments = loanTermYears * 12
    if (monthlyRate === 0) return loanAmount / totalPayments
    return Math.round(
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
    )
  }, [loanAmount, interestRate, loanTermYears])

  const monthlyPropertyTax = useMemo(
    () => Math.round((homePrice * (taxRatePercent / 100)) / 12),
    [homePrice, taxRatePercent]
  )

  const totalMonthlyPayment = useMemo(
    () => monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyHoa,
    [monthlyPrincipalInterest, monthlyPropertyTax, monthlyInsurance, monthlyHoa]
  )

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-2 text-amber-400">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Interactive Mortgage Estimator</h3>
                <p className="text-xs text-slate-400">
                  Calculate estimated monthly payments with Hogg Homes 4.99% Rate Lock incentives
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Grid Layout */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sliders Column */}
            <div className="md:col-span-7 space-y-4">
              {/* Home Price */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400 uppercase">Home Purchase Price</span>
                  <span className="text-white font-bold">${homePrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={700000}
                  step={5000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Down Payment % */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400 uppercase">Down Payment</span>
                  <span className="text-amber-300 font-bold">
                    {downPaymentPercent}% (${downPaymentAmount.toLocaleString()})
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 mb-1.5">
                  {[3.5, 5, 10, 20].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`rounded-lg py-1 text-xs font-mono transition ${
                        downPaymentPercent === pct
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-850 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400 uppercase">Interest Rate (APR)</span>
                  <span className="text-emerald-400 font-bold">
                    {interestRate}% {interestRate === 4.99 && '⭐ (Builder Promo)'}
                  </span>
                </div>
                <input
                  type="range"
                  min={4.5}
                  max={7.5}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>4.50%</span>
                  <span className="text-emerald-400 font-bold">4.99% Promo</span>
                  <span>7.50%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <span className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Loan Term
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[30, 15].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTermYears(term)}
                      className={`rounded-xl py-2 text-xs font-mono font-medium transition ${
                        loanTermYears === term
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-850 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {term}-Year Fixed
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="md:col-span-5 rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Estimated Total Monthly Payment
                </span>
                <div className="mt-2 text-3xl font-extrabold font-mono text-amber-400">
                  ${totalMonthlyPayment.toLocaleString()}
                  <span className="text-sm font-normal text-slate-400 font-sans">/mo</span>
                </div>

                <div className="mt-4 space-y-2.5 border-t border-slate-800/80 pt-3 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Principal & Interest:</span>
                    <span className="text-white font-bold">
                      ${monthlyPrincipalInterest.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Property Taxes (~2.1% TX):</span>
                    <span className="text-white">${monthlyPropertyTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Homeowner Insurance:</span>
                    <span className="text-white">${monthlyInsurance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>HOA Assessment:</span>
                    <span className="text-white">${monthlyHoa.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    onClose()
                    onOpenTourDrawer()
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Lock in Rate with Tour</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
