"use client";

import { useState, useEffect } from "react";
import { FaSave, FaUser, FaCamera, FaCloudUploadAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Sangita Sahoo",
    title: "Full Stack Developer",
    bio: "",
    about: "",
    location: "Hyderabad, Telangana",
    email: "ssangitasahoo48@gmail.com",
    phone: "+91 63711 15043",
    avatarUrl: "/profile.png",
    githubUrl: "https://github.com/sangita123-a",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
    twitterUrl: "https://twitter.com",
  });

  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(getApiUrl("/api/v1/profile"))
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setProfile(data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setProfile((prev) => ({ ...prev, avatarUrl: data.url }));
        setMessage("Profile photo uploaded to Cloudinary!");
      }
    } catch {
      alert("Failed to upload photo to Cloudinary");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/profile"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      setMessage("Profile details saved successfully to PostgreSQL database!");
    } catch (err: any) {
      setMessage("Error saving profile details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Management</h1>
        <p className="text-xs text-[#94A3B8] mt-1">
          Update personal details, bio, photo, and social links saved in PostgreSQL and rendered on your portfolio.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
          <FaCheckCircle size={14} />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6 space-y-6">
        {/* Photo Upload Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/15">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-[#00CAFF]/40 bg-black flex items-center justify-center">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <FaUser className="text-[#00CAFF]" size={40} />
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white">Profile Photo</h3>
            <p className="text-xs text-[#94A3B8]">
              Upload a new profile picture. File will be uploaded directly to Cloudinary.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] text-black text-xs font-bold cursor-pointer hover:scale-[1.02] transition-transform">
                <FaCloudUploadAlt size={14} />
                {uploadingPhoto ? "Uploading Photo..." : "Upload Photo to Cloudinary"}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>

              <input
                type="text"
                name="avatarUrl"
                value={profile.avatarUrl || ""}
                onChange={handleChange}
                placeholder="Or paste photo URL..."
                className="rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-3 py-1.5 text-xs text-white outline-none w-64"
              />
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={profile.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Professional Title</label>
            <input
              type="text"
              name="title"
              required
              value={profile.title}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={profile.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Short Bio (Hero section tagline)</label>
          <input
            type="text"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Passionate Full Stack Developer creating responsive web applications..."
            className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-2">About Description</label>
          <textarea
            name="about"
            rows={4}
            value={profile.about}
            onChange={handleChange}
            placeholder="Detailed description of experience, skills, passion, and career background..."
            className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div className="border-t border-[#00CAFF]/10 pt-4 space-y-4">
          <h3 className="text-sm font-bold text-white">Social Links</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">GitHub URL</label>
              <input
                type="text"
                name="githubUrl"
                value={profile.githubUrl || ""}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">LinkedIn URL</label>
              <input
                type="text"
                name="linkedinUrl"
                value={profile.linkedinUrl || ""}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Instagram URL</label>
              <input
                type="text"
                name="instagramUrl"
                value={profile.instagramUrl || ""}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Twitter / X URL</label>
              <input
                type="text"
                name="twitterUrl"
                value={profile.twitterUrl || ""}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-6 py-3 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] transition-all hover:scale-[1.02]"
          >
            <FaSave size={14} />
            {saving ? "Saving to Database..." : "Save Profile Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
