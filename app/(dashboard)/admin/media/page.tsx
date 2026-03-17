"use client";

import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { Upload, Trash2, Image as ImageIcon, Film, Filter, Star } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import type { AdminMedia } from "@/lib/admin-types";
import { apiGet, apiDelete, apiPost, isSuccessResponse } from "@/lib/api-client";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<AdminMedia[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<AdminMedia | null>(null);
  const [uploadCat, setUploadCat] = useState("GALLERY");
  const [heroActive, setHeroActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [heroId, setHeroId] = useState<number | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const url = `/api/admin/media?page=1&pageSize=100&category=${filter}&type=${typeFilter}`;
      const res = await apiGet<any>(url);
      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Failed to load media");
      }
      const payload = res.data;
      const list: any[] = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
      setMedia(
        list.map((m: any) => ({
          id: m.id,
          type: m.type,
          url: m.url,
          thumbnailUrl: m.thumbnailUrl || m.url,
          category: m.category,
          isPublic: !!m.isPublic,
          uploadedBy: 0,
          createdAt: m.createdAt,
        })),
      );
    } catch (e: any) {
      setError(e?.message || "Failed to load media");
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, typeFilter]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<any>("/api/admin/hero");
        if (isSuccessResponse(res)) {
          setHeroId(res.data?.id ?? null);
        }
      } catch {
        setHeroId(null);
      }
    })();
  }, []);

  const filtered = media.filter((m) => {
    if (filter !== "ALL" && m.category !== filter) return false;
    if (typeFilter !== "ALL" && m.type !== typeFilter) return false;
    return true;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const isVideo = file.type.startsWith("video/");
    const mediaType = isVideo ? "VIDEO" : "IMAGE";

    try {
       setLoading(true);
       setUploadProgress(10); // Start progress
       setError("");
 
       // 1. Get Cloudinary signature
       const sigRes = await apiPost<any>("/api/admin/media/signature", {});
       if (!isSuccessResponse(sigRes)) {
         throw new Error(sigRes.message || "Failed to get upload signature");
       }
       setUploadProgress(20);
 
       const { signature, timestamp, apiKey, cloudName, folder } = sigRes.data;
 
       // 2. Upload directly to Cloudinary using XHR for progress tracking
       const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${isVideo ? "video" : "image"}/upload`;
       
       const cloudinaryData = await new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.open("POST", uploadUrl);
 
         xhr.upload.onprogress = (event) => {
           if (event.lengthComputable) {
             const percent = Math.round((event.loaded / event.total) * 70); // 20% to 90%
             setUploadProgress(20 + percent);
           }
         };
 
         xhr.onload = () => {
           if (xhr.status >= 200 && xhr.status < 300) {
             resolve(JSON.parse(xhr.responseText));
           } else {
             reject(new Error("Cloudinary upload failed"));
           }
         };
 
         xhr.onerror = () => reject(new Error("Network error during upload"));
 
         const formData = new FormData();
         formData.append("file", file);
         formData.append("signature", signature);
         formData.append("timestamp", timestamp.toString());
         formData.append("api_key", apiKey);
         formData.append("folder", folder);
         xhr.send(formData);
       });
 
       setUploadProgress(95);
       const uploadData = cloudinaryData as any;
       const cloudinaryUrl = uploadData.secure_url;
 
       // 3. Save to our database
       const saveRes = await apiPost<any>("/api/admin/media", {
         url: cloudinaryUrl,
         type: mediaType,
         category: uploadCat,
         active: uploadCat === "HERO" ? heroActive : true,
       });
 
       if (!isSuccessResponse(saveRes)) {
         throw new Error(saveRes.message || "Failed to save media to database");
       }
 
       setUploadProgress(100);
       await load();
       if (fileRef.current) fileRef.current.value = "";
     } catch (err: any) {
       console.error("Upload error:", err);
       setError(err?.message || "Upload failed");
     } finally {
       setTimeout(() => {
         setLoading(false);
         setUploadProgress(0);
       }, 500);
     }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setLoading(true);
      const res = await apiDelete(`/api/admin/media/${deleteTarget.id}`);
      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Delete failed");
      }
      await load();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setDeleteTarget(null);
      setLoading(false);
    }
  };

  const setAsHero = async (m: AdminMedia) => {
    try {
      const res = await apiPost("/api/admin/hero", { id: m.id });
      if (isSuccessResponse(res)) {
        setHeroId(m.id);
        await load();
      } else {
        setError(res.message || "Failed to set hero");
      }
    } catch (e: any) {
      setError(e?.message || "Failed to set hero");
    }
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
      <div className="relative rounded-xl border-2 border-dashed border-border bg-card p-8 text-center overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/90 backdrop-blur-[2px]">
            <div className="mb-4 h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm font-bold text-foreground">Uploading... {uploadProgress}%</p>
            <div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
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
            <option value="HERO">Hero</option>
          </select>
          {uploadCat === "HERO" && (
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={heroActive}
                onChange={(e) => setHeroActive(e.target.checked)}
                className="h-4 w-4"
              />
              Make active hero
            </label>
          )}
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
          <option value="HERO">Hero</option>
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
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
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
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    preload="metadata"
                    playsInline
                    muted
                    // Keep admin previews light; play on hover
                    poster={m.thumbnailUrl || undefined}
                    onMouseEnter={(e) => (e.currentTarget.play().catch(() => {}))}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  >
                    <source src={m.url} />
                  </video>
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
                  <button
                    type="button"
                    onClick={() => setAsHero(m)}
                    className="ml-3 flex h-9 items-center justify-center gap-1 rounded-full bg-accent px-3 text-xs font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
                    aria-label="Set as hero"
                    title="Set as hero"
                  >
                    <Star className="h-4 w-4" />
                    Hero
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <StatusBadge status={m.category} />
                <div className="flex items-center gap-2">
                  {m?.category === "HERO" && m.id === heroId && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                      <Star className="h-3 w-3" /> HERO
                    </span>
                  )}
                  <StatusBadge status={m.type} />
                </div>
              </div>
              {m.category === "HERO" && (
                <div className="flex items-center justify-between px-3 pb-3">
                  <span className="text-[11px] text-muted-foreground">
                    {m.id === heroId ? "Active hero" : "Inactive hero"}
                  </span>
                  {m.id !== heroId && (
                    <button
                      type="button"
                      onClick={() => setAsHero(m)}
                      className="rounded-lg border px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted"
                    >
                      Set Active
                    </button>
                  )}
                </div>
              )}
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
