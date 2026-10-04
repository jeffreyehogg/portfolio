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
  const [notes, setNotes] = useState('')

  // Sync preselected when drawer opens
  useEffect(() => {
    if (preselected?.communityId) setCommunityId(preselected.communityId)
    if (preselected?.floorPlanId) setFloorPlanId(preselected.floorPlanId)
    if (preselected?.lotId) setLotId(preselected.lotId)

    if (!preferredDate) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setPreferredDate(tomorrow.toISOString().split('T')[0])
    }
  }, [preselected, isOpen])

  const selectedPlan = FLOOR_PLANS.find((p) => p.id === floorPlanId)
  const selectedLot = QUICK_MOVE_IN_LOTS.find((l) => l.id === lotId)

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
    formData.append('financingStatus', 'exploring_options')
    formData.append('realtorRepresented', 'false')
    if (notes) formData.append('notes', notes)

    startTransition(async () => {
      try {
        const res = await scheduleTourAction(formData)
        if (res.success) {
          setResponse(res)
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24'],
            })
          } catch (e) {
            // Ignore
          }
        } else {
          setErrorMessage(res.error || 'Failed to submit tour request. Please check your fields.')
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Failed to schedule tour.')
      }
    })
  }

  const downloadCalendarInvite = () => {
    if (!response || !response.tourDetails) return

    const { communityName, address, date, time } = response.tourDetails
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Hogg Homes//Tour Scheduler//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Hogg Homes Tour: ${communityName}
DESCRIPTION:Private Walkthrough on ${date} at ${time}. Location: ${address}\\nConfirmation Code: ${response.confirmationCode}
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
          className="relative w-full max-w-lg h-full bg-slate-900 border-l border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between z-10"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-sm font-semibold text-white">Schedule a Tour</span>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Confirmed Screen */}
            {response && response.success ? (
              <div className="mt-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white">
                  Tour Confirmed
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  We look forward to welcoming you!
                </p>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Confirmation Code:</span>
                    <span className="font-semibold text-amber-400 font-mono">{response.confirmationCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Community:</span>
                    <span className="text-white font-medium">{response.tourDetails?.communityName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="text-white font-medium">
                      {response.tourDetails?.date} at {response.tourDetails?.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Host:</span>
                    <span className="text-white font-medium">{response.tourDetails?.salesCounselor}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={downloadCalendarInvite}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 py-3 text-sm font-semibold text-slate-950 transition"
                  >
                    <Download className="h-4 w-4" />
                    <span>Add to Calendar</span>
                  </button>

                  <button
                    onClick={() => {
                      setResponse(null)
                      onClose()
                    }}
                    className="w-full py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Plan Your Visit</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Walk through model homes, explore available homesites, and speak with a specialist.
                  </p>
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {(selectedPlan || selectedLot) && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs flex items-center justify-between text-amber-200">
                    <div>
                      <span className="font-semibold block">
                        {selectedLot ? `Home: ${selectedLot.lotNumber}` : `Plan: ${selectedPlan?.name}`}
                      </span>
                      <span className="text-xs text-amber-300/80">
                        {selectedLot ? selectedLot.streetAddress : `${selectedPlan?.sqft} Sq Ft`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFloorPlanId('')
                        setLotId('')
                      }}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Change
                    </button>
                  </div>
                )}

                {/* Community */}
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Community
                  </label>
                  <select
                    value={communityId}
                    onChange={(e) => setCommunityId(e.target.value)}
                    className="w-full rounded-xl border border-slate-750 bg-slate-850 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    required
                  >
                    {COMMUNITIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.city}, {c.state})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-750 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-750 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:30 PM">4:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-750 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-750 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-750 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Special Requests or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Anything we should prepare for your visit?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-750 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 py-3 text-sm font-semibold text-slate-950 transition disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Scheduling Tour...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" />
                        <span>Confirm Tour Request</span>
                      </>
                    )}
                  </button>

                  <p className="mt-2 text-center text-xs text-slate-500">
                    We respect your privacy. No spam.
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
