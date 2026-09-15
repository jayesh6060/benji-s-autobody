'use client';

import React from 'react';
import { UploadedPhoto } from '@/types/visualizer';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';

interface PhotoUploaderProps {
  photos: UploadedPhoto[];
  onAddPhoto: (photo: UploadedPhoto) => void;
  onRemovePhoto: (id: string) => void;
}

export default function PhotoUploader({ photos, onAddPhoto, onRemovePhoto }: PhotoUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto: UploadedPhoto = {
            id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            url: event.target.result as string,
            label: 'Damage Photo',
            name: file.name,
          };
          onAddPhoto(newPhoto);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-oswald uppercase tracking-wider">Upload Vehicle Photos</h4>
            <p className="text-[11px] text-slate-400">Optional: Add actual vehicle damage photos ({photos.length} uploaded)</p>
          </div>
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      <label className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-800 hover:border-[#e63946] bg-slate-950/60 hover:bg-slate-950 rounded-xl cursor-pointer transition text-center group">
        <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#e63946] mb-2 transition" />
        <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
          Click or drop damage photos here
        </span>
        <span className="text-[10px] text-slate-500 mt-1">Supports JPG, PNG, WEBP (Up to 10MB per photo)</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Thumbnails Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
              <button
                onClick={() => onRemovePhoto(photo.id)}
                className="absolute top-1 right-1 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md opacity-90 transition shadow-md"
                title="Remove Photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
