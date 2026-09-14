export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  iconName: string;
  features: string[];
  popular?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: "collision-repair",
    title: "Collision & Structural Repair",
    description: "Complete post-accident restoration using computerized laser frame alignment to bring your vehicle back to factory safety specifications.",
    startingPrice: "$350",
    iconName: "ShieldAlert",
    features: [
      "Computerized Frame Straightening",
      "Structural Safety Inspection",
      "OEM Replacement Parts",
      "Lifetime Workmanship Warranty"
    ],
    popular: true
  },
  {
    id: "custom-paint",
    title: "Custom Paint & Color Matching",
    description: "State-of-the-art down-draft spray booth refinishing with computerized spectral color matching for seamless invisible panel blending.",
    startingPrice: "$299",
    iconName: "Palette",
    features: [
      "Spectrophotometer Color Match",
      "Clear Coat UV Protection",
      "Multi-stage Pearl & Metallic Finish",
      "Dust-free Down-draft Spray Booth"
    ],
    popular: true
  },
  {
    id: "dent-scratch",
    title: "Paintless Dent Repair (PDR) & Scratch Removal",
    description: "Fast, non-invasive removal of door dings, hail damage, and deep scratches without compromising factory paint.",
    startingPrice: "$120",
    iconName: "Sparkles",
    features: [
      "Paintless Hail Repair",
      "Precision Metal Massaging",
      "Deep Scratch Wet-Sanding & Polish",
      "Quick Same-Day Turnaround"
    ]
  },
  {
    id: "bumper-fender",
    title: "Bumper & Fender Restoration",
    description: "Repair or replacement of cracked, scuffed, or misaligned plastic bumpers and front fenders at a fraction of dealership costs.",
    startingPrice: "$195",
    iconName: "Wrench",
    features: [
      "Plastic Welding & Reinforcement",
      "Sensor & Radar Recalibration",
      "Quick Express Bumper Repair",
      "Custom Trim Fitting"
    ]
  },
  {
    id: "detailing-coating",
    title: "Auto Detailing & Ceramic Coating",
    description: "Full interior and exterior paint correction, swirl removal, and ultra-durable hydrophobic ceramic coating application.",
    startingPrice: "$249",
    iconName: "ShieldCheck",
    features: [
      "Multi-Stage Paint Correction",
      "9H Ceramic Hydrophobic Protection",
      "Interior Steam Cleaning & Leather Care",
      "Headlight Restoration Included"
    ]
  },
  {
    id: "insurance-assistance",
    title: "Insurance Claim Assistance",
    description: "We handle your insurance claims from start to finish! Direct billing to all major insurance companies with zero hassle for you.",
    startingPrice: "Direct Claim Handling",
    iconName: "FileCheck",
    features: [
      "Direct Billing to All Carriers",
      "Comprehensive Damage Photo Log",
      "Deductible Relief Options",
      "Free Loaner Vehicle Coordination"
    ],
    popular: true
  }
];
