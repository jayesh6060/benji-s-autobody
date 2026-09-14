export interface ReviewItem {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const reviewsData: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Alex Rivera",
    vehicle: "2023 BMW M3 Competition",
    rating: 5,
    date: "September 2026",
    comment: "Benji is hands down the best autobody craftsman in town. Had rear fender and bumper damage after a hit and run. He got the factory Isle of Man Green paint color matched 100% perfectly. The shop communicated every step via WhatsApp!",
    verified: true
  },
  {
    id: "rev-2",
    name: "Dmitri Kozlov",
    vehicle: "2022 Porsche 911 GT3",
    rating: 5,
    date: "August 2026",
    comment: "Brought my GT3 in for carbon fiber bumper repair and full paint correction. Benji personally handled the entire job. Unbelievable attention to detail and honest pricing. Highly recommend @benjis_autobody!",
    verified: true
  },
  {
    id: "rev-3",
    name: "Carlos Mendez",
    vehicle: "2024 Toyota Supra GR",
    rating: 5,
    date: "July 2026",
    comment: "Heavy dent on the passenger door from a hit-and-run parking accident. Benji pulled the dent out paintlessly and polished the clearcoat. Saved me thousands compared to replacing the door panel!",
    verified: true
  },
  {
    id: "rev-4",
    name: "Rachel Stern",
    vehicle: "2023 Mercedes-Benz GLE Coupe",
    rating: 5,
    date: "June 2026",
    comment: "Insurance claim was handled seamlessly by Benji. He dealt directly with Geico, ordered original OEM parts, and had my car back in pristine condition faster than estimated.",
    verified: true
  }
];
