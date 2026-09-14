import { business } from '@/config/business';

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email?: string;
  vehicleInfo?: string; // e.g. "Toyota Camry (2022)"
  serviceNeeded: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  photoFiles?: File[];
  photoUrls?: string[];
}

export interface InquiryResult {
  success: boolean;
  whatsappUrl: string;
  error?: string;
  photosAttached: boolean;
}

export interface ReviewFormData {
  name: string;
  vehicle?: string;
  rating: number;
  comment: string;
}

/**
 * Central integration point for customer inquiries.
 * Easily extendable to store inquiries in a DB or send via WhatsApp Business API in the future.
 */
export async function submitInquiry(data: InquiryFormData): Promise<InquiryResult> {
  // 1. Basic validation
  if (!data.fullName || !data.fullName.trim()) {
    return { success: false, whatsappUrl: '', error: 'Full name is required.', photosAttached: false };
  }
  if (!data.phone || !data.phone.trim()) {
    return { success: false, whatsappUrl: '', error: 'Phone number is required.', photosAttached: false };
  }
  if (!data.serviceNeeded || !data.serviceNeeded.trim()) {
    return { success: false, whatsappUrl: '', error: 'Please select a service needed.', photosAttached: false };
  }

  // Clean phone input
  const cleanPhone = data.phone.trim();
  const dateSubmitted = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const photoCount = (data.photoFiles?.length || 0) + (data.photoUrls?.length || 0);

  // 2. Format clean readable WhatsApp payload
  let messageLines: string[] = [
    `🚗 *NEW CUSTOMER INQUIRY — ${business.name}*`,
    ``,
    `*Name:* ${data.fullName.trim()}`,
    `*Phone:* ${cleanPhone}`,
  ];

  if (data.email && data.email.trim()) {
    messageLines.push(`*Email:* ${data.email.trim()}`);
  }

  if (data.vehicleInfo && data.vehicleInfo.trim()) {
    messageLines.push(`*Vehicle:* ${data.vehicleInfo.trim()}`);
  }

  messageLines.push(`*Service Needed:* ${data.serviceNeeded.trim()}`);

  if (data.preferredDate && data.preferredDate.trim()) {
    messageLines.push(`*Preferred Date:* ${data.preferredDate.trim()}`);
  }

  if (data.preferredTime && data.preferredTime.trim()) {
    messageLines.push(`*Preferred Time:* ${data.preferredTime.trim()}`);
  }

  if (data.message && data.message.trim()) {
    messageLines.push(``);
    messageLines.push(`*Description / Issue:*`);
    messageLines.push(`"${data.message.trim()}"`);
  }

  if (photoCount > 0) {
    messageLines.push(``);
    messageLines.push(`📷 *[${photoCount} photo(s) attached — will send in chat next]*`);
    if (data.photoUrls && data.photoUrls.length > 0) {
      data.photoUrls.forEach((url, i) => {
        messageLines.push(`Photo ${i + 1}: ${url}`);
      });
    }
  }

  messageLines.push(``);
  messageLines.push(`_Submitted via Website on ${dateSubmitted}_`);

  const fullText = messageLines.join('\n');
  const encodedText = encodeURIComponent(fullText);

  // 3. Construct wa.me link
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodedText}`;

  // Future-proofing hook: Log to backend / storage / analytics here if needed.

  return {
    success: true,
    whatsappUrl,
    photosAttached: photoCount > 0,
  };
}

/**
 * Format review input into a WhatsApp message for the shop owner
 */
export function formatReviewWhatsAppUrl(data: ReviewFormData): string {
  const stars = '⭐'.repeat(data.rating);
  const lines = [
    `⭐ *NEW CUSTOMER REVIEW FOR BENJIS AUTO BODY*`,
    ``,
    `*Rating:* ${stars} (${data.rating}/5)`,
    `*Name:* ${data.name.trim()}`,
  ];

  if (data.vehicle && data.vehicle.trim()) {
    lines.push(`*Vehicle:* ${data.vehicle.trim()}`);
  }

  lines.push(``);
  lines.push(`*Review:*`);
  lines.push(`"${data.comment.trim()}"`);

  const fullText = lines.join('\n');
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(fullText)}`;
}
