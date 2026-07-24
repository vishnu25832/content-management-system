"use client";

import { useEffect,useState } from "react";
import api from "../../services/api";

export default function AddContentModal({
  isOpen,
  onClose,
  onSuccess,
  editContent,
}) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editContent) {
      setForm({
        title: editContent.title,
        slug: editContent.slug,
        content: editContent.content,
        status: editContent.status,
      });
    } else {
      setForm({
        title: "",
        slug: "",
        content: "",
        status: "draft",
      });
    }
  
    setError("");
  }, [editContent, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
        if (editContent) {
            await api.put(`/content/${editContent._id}`, form);
          } else {
            await api.post("/content", form);
          }

      setForm({
        title: "",
        slug: "",
        content: "",
        status: "draft",
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create content."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
            {editContent ? "Edit Content" : "Add New Content"}
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-4 py-3"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-4 py-3"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Content
            </label>

            <textarea
              rows={6}
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-4 py-3"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-4 py-3"
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-black px-5 py-2 text-white"
            >
               {loading
                    ? (editContent ? "Updating..." : "Saving...")
                    : (editContent ? "Update" : "Save")}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}