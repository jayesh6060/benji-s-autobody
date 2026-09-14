export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I get a free repair estimate?",
    answer: "Getting an estimate is fast and easy! Fill out our online form on this site with details and optional photo attachments. Clicking submit immediately opens a formatted message in your WhatsApp. Send it over, and Benji will reply with an estimate or schedule a quick in-person inspection."
  },
  {
    id: "faq-2",
    question: "Do you work with my insurance provider?",
    answer: "Yes! Benjis Auto Body works with all major insurance companies (State Farm, Geico, Progressive, Allstate, Nationwide, USAA, and more). We handle the paperwork, claim photos, and supplement filings directly so you don't have to stress."
  },
  {
    id: "faq-3",
    question: "How long does a typical collision repair take?",
    answer: "Repair duration depends on the severity of damage and parts availability. Minor bumper or dent repairs take 1–3 days. Major collision repairs usually take 4–7 business days. We provide accurate timeframes upon initial inspection."
  },
  {
    id: "faq-4",
    question: "Do you offer a warranty on paint and bodywork?",
    answer: "Absolutely. We stand behind our craftsmanship with a Lifetime Limited Warranty on all collision repairs, frame alignments, and paint jobs for as long as you own the vehicle."
  },
  {
    id: "faq-5",
    question: "Will the new paint match my car's existing color?",
    answer: "Yes! We utilize computerized spectrophotometer color matching system and high-end down-draft spray booths. We match your vehicle's precise paint code and account for factory pearl/metallic flakes and natural paint aging."
  },
  {
    id: "faq-6",
    question: "What should I do if my car isn't drivable?",
    answer: "Call us directly at (636) 174-7047 or message us on WhatsApp! We can assist in arranging a flatbed tow truck to bring your vehicle directly to our shop."
  }
];
