"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddContentModal from "../../components/forms/AddContentModal";
import api from "../../services/api";


export default function Dashboard() {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editContent, setEditContent] = useState(null);

  const fetchContents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/content");

      setContents(response.data.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchContents();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this content?"
    );
  
    if (!confirmed) return;
  
    try {
      await api.delete(`/content/${id}`);
      fetchContents();
    } catch (error) {
      console.error(error);
      alert("Failed to delete content.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  
    dispatch(logout());
  
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">

        <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                CMS Dashboard
              </h1>

              <p className="mt-2 text-lg">
                Welcome,
                <strong> {admin?.name}</strong>
              </p>

              <p className="text-gray-500">
                {admin?.email}
              </p>

            </div>

            <div className="flex gap-3">
                <button
                onClick={() => {
                    setEditContent(null);
                    setShowModal(true);
                }}
                className="rounded bg-black px-5 py-3 text-white hover:bg-gray-800"
                >
                + Add Content
                </button>

                <button
                    onClick={handleLogout}
                    className="rounded bg-red-700 px-5 py-3 text-white hover:bg-red-800"
                >
                 Logout
                </button>

                </div>

          </div>

          {loading ? (

            <div className="py-10 text-center text-lg">
              Loading contents...
            </div>

          ) : contents.length === 0 ? (

            <div className="rounded border border-dashed p-10 text-center text-gray-500">
              No content available.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="border p-3 text-left">
                      Title
                    </th>

                    <th className="border p-3 text-left">
                      Slug
                    </th>

                    <th className="border p-3 text-left">
                      Status
                    </th>

                    <th className="border p-3 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {contents.map((item) => (

                    <tr
                      key={item._id}
                      className="hover:bg-gray-50"
                    >

                      <td className="border p-3">
                        {item.title}
                      </td>

                      <td className="border p-3">
                        {item.slug}
                      </td>

                      <td className="border p-3">

                        <span
                          className={`rounded px-3 py-1 text-sm font-medium ${
                            item.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="border p-3 text-center">

                      <button
                        onClick={() => {
                            setEditContent(item);
                            setShowModal(true);
                        }}
                        className="mr-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                         Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        <AddContentModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditContent(null);
        }}
          onSuccess={fetchContents}
          editContent={editContent}
        />

      </div>
    </ProtectedRoute>
  );
}