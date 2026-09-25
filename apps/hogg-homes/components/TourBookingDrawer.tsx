'use client'

import { useState, useTransition, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  X,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  Download,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  User,
} from 'lucide-react'
import { COMMUNITIES, FLOOR_PLANS, QUICK_MOVE_IN_LOTS } from '../lib/data'
import { TourBookingResponse } from '../lib/types'
import { scheduleTourAction } from '../actions/schedule-tour'

interface TourBookingDrawerProps {
  isOpen: boolean
  onClose: () => void
  preselected?: {
    communityId?: string
    floorPlanId?: string
    lotId?: string
  }
}

export default function TourBookingDrawer({
  isOpen,
  onClose,
  preselected,
}: TourBookingDrawerProps) {
  const [isPending, startTransition] = useTransition()
  const [response, setResponse] = useState<TourBookingResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Form State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [communityId, setCommunityId] = useState(preselected?.communityId || COMMUNITIES[0].id)
  const [floorPlanId, setFloorPlanId] = useState(preselected?.floorPlanId || '')
  const [lotId, setLotId] = useState(preselected?.lotId || '')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('10:00 AM')
  const [financingStatus, setFinancingStatus] = useState<
    'pre_approved' | 'cash_buyer' | 'exploring_options' | 'need_lender'
  >('exploring_options')
  const [realtorRepresented, setRealtorRepresented] = useState(false)
  const [notes, setNotes] = useState('')

  // Sync preselected when drawer opens
  useEffect(() => {
    if (preselected?.communityId) setCommunityId(preselected.communityId)
    if (preselected?.floorPlanId) setFloorPlanId(preselected.floorPlanId)
    if (preselected?.lotId) setLotId(preselected.lotId)

    // Default date to tomorrow if empty
    if (!preferredDate) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setPreferredDate(tomorrow.toISOString().split('T')[0])
    }
  }, [preselected, isOpen])

  const selectedPlan = FLOOR_PLANS.find((p) => p.id === floorPlanId)
  const selectedLot = QUICK_MOVE_IN_LOTS.find((l) => l.id === lotId)

  // Handle Submit via Server Action
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    const formData = new FormData()
    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('communityId', communityId)
    formData.append('preferredDate', preferredDate)
    formData.append('preferredTime', preferredTime)
    if (floorPlanId) formData.append('floorPlanId', floorPlanId)
    if (lotId) formData.append('lotId', lotId)
    formData.append('financingStatus', financingStatus)
    formData.append('realtorRepresented', realtorRepresented ? 'true' : 'false')
    if (notes) formData.append('notes', notes)

    startTransition(async () => {
      try {
        const res = await scheduleTourAction(formData)
        if (res.success) {
          setResponse(res)
          // Trigger celebratory confetti burst
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24'],
            })
          } catch (e) {
            // Ignore if canvas unsupported
          }
        } else {
          setErrorMessage(res.error || 'Failed to submit tour request. Please check your fields.')
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Server action failed.')
      }
    })
  }

  // Generate .ics Calendar Invite
  const downloadCalendarInvite = () => {
    if (!response || !response.tourDetails) return

    const { communityName, address, date, time } = response.tourDetails
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Hogg Homes//VIP Tour Scheduler//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Hogg Homes VIP Tour: ${communityName}
DESCRIPTION:VIP Private Walkthrough on ${date} at ${time}. Location: ${address}\\nConfirmation Code: ${response.confirmationCode}
LOCATION:${address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `HoggHomes-Tour-${response.confirmationCode}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Slide-Over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl h-full bg-slate-900 border-l border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between z-10"
        >
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-0.5 text-xs font-mono font-medium text-amber-300">
                  PRIVATE VIP TOUR
                </span>
                <span className="text-xs font-mono text-slate-400">
                  REAL-TIME CRM INTEGRATION
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* If Confirmed Success Screen */}
            {response && response.success ? (
              <div className="mt-8 text-center animate-fade-in">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  VIP Tour Confirmed!
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Your private tour request has been synchronized with the sales desk.
                </p>

                {/* Confirmation Box */}
                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400 uppercase">Confirmation Code:</span>
                    <span className="font-bold text-amber-400">{response.confirmationCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400 uppercase">Community:</span>
                    <span className="text-white">{response.tourDetails?.communityName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400 uppercase">Date & Time:</span>
                    <span className="text-emerald-400">
                      {response.tourDetails?.date} at {response.tourDetails?.time}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400 uppercase">Sales Counselor:</span>
                    <span className="text-white">{response.tourDetails?.salesCounselor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 uppercase">CRM Webhook Status:</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      DISPATCHED ({response.crmPayload?.latencyMs}ms)
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={downloadCalendarInvite}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-sm font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/10"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download .ICS Calendar Invite</span>
                  </button>

                  <button
                    onClick={() => {
                      setResponse(null)
                      onClose()
                    }}
                    className="w-full py-2.5 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Done / Return to Platform
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">Schedule Your Private Tour</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Tour luxury model homes, review construction lots, and discuss builder rate buydown incentives.
                  </p>
                </div>

                {/* Error Banner if any */}
                {errorMessage && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Preselected details banner if present */}
                {(selectedPlan || selectedLot) && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs flex items-center justify-between text-amber-200">
                    <div>
                      <span className="font-bold block">
                        {selectedLot ? `Selected: ${selectedLot.lotNumber}` : `Selected Plan: ${selectedPlan?.name}`}
                      </span>
                      <span className="text-[11px] text-amber-300/80">
                        {selectedLot ? selectedLot.streetAddress : `${selectedPlan?.sqft} Sq Ft`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFloorPlanId('')
                        setLotId('')
                      }}
                      className="text-[10px] font-mono underline hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Community Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-amber-400" />
                    Select Community
                  </label>
                  <select
                    value={communityId}
                    onChange={(e) => setCommunityId(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                    required
                  >
                    {COMMUNITIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.city}, {c.state} ({c.priceRange})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="10:00 AM">10:00 AM (Morning Walkthrough)</option>
                      <option value="11:30 AM">11:30 AM (Late Morning)</option>
                      <option value="1:30 PM">1:30 PM (Early Afternoon)</option>
                      <option value="3:00 PM">3:00 PM (Mid Afternoon)</option>
                      <option value="4:30 PM">4:30 PM (Sunset Tour)</option>
                    </select>
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="space-y-3.5 border-t border-slate-800 pt-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-amber-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rachel Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-amber-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="rachel@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-amber-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(832) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Financing Status & Realtor */}
                <div className="space-y-3 border-t border-slate-800 pt-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Financing Status
                    </label>
                    <select
                      value={financingStatus}
                      onChange={(e) =>
                        setFinancingStatus(
                          e.target.value as
                            | 'pre_approved'
                            | 'cash_buyer'
                            | 'exploring_options'
                            | 'need_lender'
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="pre_approved">Pre-Approved with a Lender</option>
                      <option value="cash_buyer">Cash Buyer (No Financing Needed)</option>
                      <option value="exploring_options">Exploring Options / Not Yet Pre-Approved</option>
                      <option value="need_lender">Interested in Hogg Homes 4.99% In-House Rate Lock</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="realtor"
                      checked={realtorRepresented}
                      onChange={(e) => setRealtorRepresented(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-850 text-amber-500 focus:ring-amber-500"
                    />
                    <label htmlFor="realtor" className="text-xs text-slate-300">
                      I am actively represented by a Licensed Real Estate Agent
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                      Special Requests or Specific Lots of Interest (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for cul-de-sac lots with room for a private pool..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Synchronizing with Sales Desk Webhook...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" />
                        <span>Confirm VIP Tour Reservation</span>
                      </>
                    )}
                  </button>

                  <p className="mt-2 text-center text-[11px] font-mono text-slate-400">
                    Encrypted via Zod • Next.js 15 Server Action • Zero Spam Guarantee
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
