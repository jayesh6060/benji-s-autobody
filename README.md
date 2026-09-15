# 🚗 Benji's Autobody — Modern Collision Repair & Auto Body Website

A premium, modern web application built for **Benji's Autobody**, featuring precision collision repair branding, direct-to-owner WhatsApp estimate bookings, interactive work portfolio, customer testimonials, and a sleek high-conversion aesthetic.

---

## 🌟 Key Features

* **📱 Direct WhatsApp Estimate Booking**: Customers fill out vehicle details, service requirements, and issue descriptions which format directly into a structured WhatsApp message sent straight to the shop owner (+1 929-569-9042).
* **🎨 High-End Automotive Aesthetic**: Designed with an ultra-sleek midnight navy (`#0B132B`, `#1A2A5E`) and electric crimson (`#E63946`) palette, high-contrast typography (Oswald + Inter), and dynamic card hover effects.
* **🏎️ Interactive Repair Gallery**: Filterable portfolio showcasing real car repair work across collision damage, paint correction, dent removal, and bumper replacement.
* **💬 Real Customer Reviews & Ratings**: Integrated Google & Yelp star rating badges with authentic customer testimonials and vehicle repair highlights.
* **❓ Comprehensive FAQ Accordion**: Answers to common insurance claim questions, repair timelines, rental car assistance, and lifetime warranty coverage.
* **📱 100% Fully Mobile Responsive**: Seamless touch navigation and instant action buttons optimized for smartphones and desktop screens alike.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Fonts**: Google Fonts (`Oswald` & `Inter` via `next/font`)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jayesh6060/benji-s-autobody.git
   cd benji-s-autobody
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`).

---

## ⚙️ Business Configuration

All key shop details (phone number, address, business hours, social links, and WhatsApp routing) are centralized in `config/business.ts`:

```typescript
export const BUSINESS_CONFIG = {
  name: "Benji's Autobody",
  phone: "+1 (929) 569-9042",
  whatsappNumber: "19295699042",
  address: "123 Auto Craft Way, Queens, NY 11101",
  hours: "Mon - Sat: 8:00 AM - 6:00 PM",
};
```

---

## 📝 License

This project is proprietary and customized for Benji's Autobody.
