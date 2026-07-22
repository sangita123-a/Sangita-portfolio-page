"use client";

import { useState, useEffect } from "react";
import { FaSave, FaUser, FaCamera } from "react-icons/fa";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/v1/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setProfile(data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/v1/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      setMessage("Profile saved successfully to PostgreSQL!");
    } catch (err: any) {
      setMessage("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Management</h1>
        <p className="text-xs text-[#94A3B8] mt-1">Update your personal details, bio, and social links saved in PostgreSQL.</p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
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

          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Avatar / Profile Photo URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={profile.avatarUrl}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Short Bio (Hero section)</label>
          <input
            type="text"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
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
            className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div className="border-t border-[#00CAFF]/10 pt-4 space-y-4">
          <h3 className="text-sm font-bold text-white">Social Media Links</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">GitHub URL</label>
              <input
                type="text"
                name="githubUrl"
                value={profile.githubUrl}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">LinkedIn URL</label>
              <input
                type="text"
                name="linkedinUrl"
                value={profile.linkedinUrl}
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-6 py-3 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] transition-all duration-300 hover:scale-[1.02]"
          >
            <FaSave size={14} />
            {saving ? "Saving..." : "Save Profile Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
