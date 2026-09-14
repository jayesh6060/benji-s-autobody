export interface GalleryItem {
  id: string;
  title: string;
  vehicle: string;
  category: "collision" | "paint" | "dent" | "bumper";
  beforeImage: string;
  afterImage: string;
  description: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Front-End Collision & Frame Realignment",
    vehicle: "2023 Chevrolet Silverado 1500",
    category: "collision",
    beforeImage: "/images/gallery/silverado-before.jpg",
    afterImage: "/images/gallery/silverado-before.jpg",
    description: "Severe front bumper collapse, crumple zone impact, and headlight casing destruction fully restored to original factory tolerance."
  },
  {
    id: "gal-2",
    title: "Door Quarter Panel Dent & Scratch Blend",
    vehicle: "2022 Audi A6 Quattro",
    category: "dent",
    beforeImage: "/images/gallery/audi-before.jpg",
    afterImage: "/images/gallery/audi-before.jpg",
    description: "Deep side crease dent pulled via precision PDR and metallic paint seamlessly blended with ceramic clearcoat."
  },
  {
    id: "gal-3",
    title: "Rear Bumper Crack & Custom Paint Finish",
    vehicle: "2024 Porsche 911 Carrera S",
    category: "bumper",
    beforeImage: "/images/gallery/porsche-before.jpg",
    afterImage: "/images/gallery/porsche-before.jpg",
    description: "Fiberglass/plastic welding repair with custom spectral color match refinish in high-gloss down-draft paint booth."
  },
  {
    id: "gal-4",
    title: "Full Hood Hail Damage & Ceramic Coating",
    vehicle: "2021 Ford Mustang GT",
    category: "paint",
    beforeImage: "/images/gallery/mustang-before.jpg",
    afterImage: "/images/gallery/mustang-before.jpg",
    description: "Multiple hail crater indentations smoothed without repainting, completed with 9H ceramic shield protection."
  }
];
