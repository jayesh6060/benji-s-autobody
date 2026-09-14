'use client';

import React, { useState, useEffect } from 'react';
import { business } from '@/config/business';
import { servicesData } from '@/data/services';
import { submitInquiry, InquiryFormData } from '@/lib/inquiry';
import ConfirmationModal from './ConfirmationModal';
import { MessageSquare, Upload, Phone, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface BookingSectionProps {
  selectedServiceTitle?: string;
}

export default function BookingSection({ selectedServiceTitle }: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(servicesData[0].title);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const [validationError, setValidationError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeWhatsappUrl, setActiveWhatsappUrl] = useState('');

  useEffect(() => {
    if (selectedServiceTitle) {
      setServiceNeeded(selectedServiceTitle);
    }
  }, [selectedServiceTitle]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setPhotoFiles((prev) => [...prev, ...selectedFiles]);

      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setValidationError('Please enter a valid phone number.');
      return;
    }
    if (!serviceNeeded.trim()) {
      setValidationError('Please select the service needed.');
      return;
    }

    const payload: InquiryFormData = {
      fullName,
      phone,
      email,
      vehicleInfo,
      serviceNeeded,
      preferredDate,
      preferredTime,
      message,
      photoFiles,
    };

    const result = await submitInquiry(payload);

    if (!result.success) {
      setValidationError(result.error || 'Failed to generate inquiry message.');
      return;
    }

    setActiveWhatsappUrl(result.whatsappUrl);
    setModalOpen(true);
    window.open(result.whatsappUrl, '_blank');
  };

  return (
    <section id="book-now" className="py-24 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
            05 // DIRECT INQUIRY PROTOCOL
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            INITIALIZE <span className="text-blue-600">ESTIMATE REQUEST</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Fill out the form below. Your request will format instantly into a WhatsApp chat directly with owner Benji.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xl space-y-6">

            {validationError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-2 font-mono">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Row 1: Full Name & Phone Number */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (636) 555-0199"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Vehicle Make/Model */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    EMAIL ADDRESS (OPTIONAL)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    VEHICLE MAKE / MODEL / YEAR
                  </label>
                  <input
                    type="text"
                    value={vehicleInfo}
                    onChange={(e) => setVehicleInfo(e.target.value)}
                    placeholder="e.g. 2022 Toyota Camry"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Service Needed Selector */}
              <div>
                <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  SERVICE NEEDED *
                </label>
                <select
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors font-sans"
                >
                  {servicesData.map((svc) => (
                    <option key={svc.id} value={svc.title} className="bg-white text-slate-900">
                      {svc.title} (Starting at {svc.startingPrice})
                    </option>
                  ))}
                  <option value="Other Repair / Custom Request" className="bg-white text-slate-900">
                    Other Repair / Custom Request
                  </option>
                </select>
              </div>

              {/* Row 4: Preferred Date & Time */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    PREFERRED DATE (OPTIONAL)
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    PREFERRED TIME (OPTIONAL)
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors font-sans"
                  >
                    <option value="">Any Time / Flexible</option>
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM - 6:00 PM)">Late Afternoon (4:00 PM - 6:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Message / Issue Description */}
              <div>
                <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  DESCRIPTION OF DAMAGE
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe where the damage is located, if insurance is involved, or any specific details..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Row 6: Upload Photos */}
              <div>
                <label className="block font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  UPLOAD DAMAGE PHOTOS (OPTIONAL)
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-blue-600 rounded-2xl p-6 text-center bg-slate-50 transition-colors">
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                    <p className="font-mono text-xs font-bold text-slate-900 uppercase">[ ATTACH VEHICLE DAMAGE PHOTOS ]</p>
                    <p className="text-xs text-slate-500">JPG, PNG up to 10MB per photo</p>
                  </label>
                </div>

                {/* Photo Previews */}
                {photoPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {photoPreviews.map((src, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group">
                        <img src={src} alt="Uploaded vehicle damage photo preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-[10px] opacity-90 group-hover:opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-600/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>[ SEND REQUEST TO BENJI'S WHATSAPP ]</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-slate-500 text-center mt-3">
                  Clicking submit formats your information into a clean WhatsApp message and opens a chat with the shop owner.
                </p>
              </div>

            </form>
          </div>

          {/* Right Column: Info & Process Highlights */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-lg">
              <h3 className="text-base font-extrabold text-slate-900 uppercase flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>BOOKING PROTOCOL</span>
              </h3>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                    01
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Fill Details & Hit Submit</h4>
                    <p className="text-slate-600">Enter basic info & attached photos of your car's damage.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                    02
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">WhatsApp Opens Pre-filled</h4>
                    <p className="text-slate-600">Your message formatted cleanly with vehicle info is ready to send.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                    03
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Reply From Benji</h4>
                    <p className="text-slate-600">Benji reviews and responds personally with an estimate & appt time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-6 space-y-4 shadow-xl">
              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase block">[ TELEPHONE DIRECT ]</span>
              <h4 className="text-sm font-extrabold uppercase">Prefer Calling?</h4>
              <p className="text-xs text-slate-300">
                Reach Benji directly during business hours for urgent towing or immediate questions.
              </p>
              <a
                href={`tel:${business.ownerPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL {business.formattedPhone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappUrl={activeWhatsappUrl}
        photosAttached={photoFiles.length > 0}
      />
    </section>
  );
}
