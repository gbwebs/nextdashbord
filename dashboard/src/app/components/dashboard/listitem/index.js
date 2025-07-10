'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function CarTable() {
  const [listings, setListings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: '', location: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  const fetchListings = async () => {
    const res = await fetch('/api/listing');
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const updateRow = (id, updatedFields) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  const handleAction = async (id, action) => {
    await fetch('/api/listing', {
      method: 'POST',
      body: JSON.stringify({ id, action }),
    });

    const status = action === 'approve' ? 'approved' : 'rejected';
    updateRow(id, { status });
  };

  const handleEditClick = (listing) => {
    setEditId(listing.id);
    setEditData({ title: listing.title, location: listing.location });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/listings', {
      method: 'POST',
      body: JSON.stringify({
        id: editId,
        action: 'update',
        data: editData,
      }),
    });
    updateRow(editId, editData);
    closeModal();
  };

  const filteredListings =
    filter === 'all'
      ? listings
      : listings.filter((l) => l.status === filter);

  const listingsPerPage = 5;
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
  const startIndex = (page - 1) * listingsPerPage;
  const paginatedListings = filteredListings.slice(
    startIndex,
    startIndex + listingsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="mb-6 flex justify-between items-center">
          <label className="font-semibold text-gray-700">
            Filter by Status:
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="ml-3 border px-3 py-1 rounded-md bg-white shadow-sm focus:outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
  <table className="min-w-full text-sm bg-white">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Car</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedListings.map((car, idx) => (
                <tr
                  key={car.id}
                  className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4">{car.title}</td>
                  <td className="px-6 py-4 capitalize">{car.status}</td>
                  <td className="px-6 py-4">{car.location}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleAction(car.id, 'approve')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(car.id, 'reject')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleEditClick(car)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-white shadow-xl p-6">
            <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
              Edit Listing
            </Dialog.Title>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Car Title"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="City / Branch"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
