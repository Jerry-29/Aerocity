"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Image as ImageIcon, Film, Filter } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { mockMedia } from "@/lib/admin-data";
import type { AdminMedia } from "@/lib/admin-types";

export default function AdminMediaPage() {
  const [media, setMedia] = useState(mockMedia);
  const [filter, setFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<AdminMedia | null>(null);
  const [uploadCat, setUploadCat] = useState("GALLERY");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = media.filter((m) => {
    if (filter !== "ALL" && m.category !== filter) return false;
    if (typeFilter !== "ALL" && m.type !== typeFilter) return false;
    return true;
  });

  const handleUpload = () => {
    // In production, this would upload to Cloudinary via the backend
    const newMedia: AdminMedia = {
      id: Date.now(),
      type: "IMAGE",
      url: "/images/hero-waterpark.jpg",
      thumbnailUrl: "/images/hero-waterpark.jpg",
      category: uploadCat as AdminMedia["category"],
      isPublic: true,
      uploadedBy: 1,
      createdAt: new Date().toISOString(),
    };
    setMedia((prev) => [newMedia, ...prev]);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setMedia((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Media Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload and manage media files
        </p>
      </div>

      {/* Upload Area */}
      <div className="rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleUpload}
        />
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Drag & drop files here, or click to browse
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supports images and videos up to 10MB
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <select
            value={uploadCat}
            onChange={(e) => setUploadCat(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="GALLERY">Gallery</option>
            <option value="ATTRACTION">Attraction</option>
            <option value="GENERAL">General</option>
          </select>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Upload className="h-4 w-4" />
            Upload Files
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="ALL">All Categories</option>
          <option value="GALLERY">Gallery</option>
          <option value="ATTRACTION">Attraction</option>
          <option value="GENERAL">General</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="ALL">All Types</option>
          <option value="IMAGE">Images</option>
          <option value="VIDEO">Videos</option>
        </select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} items
        </span>
      </div>

      {/* Media Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No media files found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="group relative overflow-hidden rounded-xl border bg-card shadow-sm"
            >
              <div className="relative aspect-video">
                {m.type === "IMAGE" ? (
                  <Image
                    src={m.thumbnailUrl}
                    alt="Media"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <Film className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/40 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(m)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-110"
                    aria-label="Delete media"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <StatusBadge status={m.category} />
                <StatusBadge status={m.type} />
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Media"
        description="Are you sure you want to delete this media file? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
