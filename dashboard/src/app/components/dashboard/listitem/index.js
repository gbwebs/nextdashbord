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
    await fetch('/api/listing', {
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
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#cc4700]">Rental Listings</h2>
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

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-gradient-to-r from-[#cc4700] to-[#ed8413] text-white uppercase tracking-wide">
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
                className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-orange-50 transition`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">{car.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    car.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : car.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{car.location}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleAction(car.id, 'approve')}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition text-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(car.id, 'reject')}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-xs"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleEditClick(car)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition text-xs"
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
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#cc4700] to-[#ed8413] text-white hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#cc4700] to-[#ed8413] text-white hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white shadow-2xl border border-gray-200 p-6">
      <Dialog.Title className="text-xl font-bold mb-4 text-[#cc4700]">
        Edit Listing
      </Dialog.Title>

      <form onSubmit={handleEditSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Car Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="City / Branch"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#cc4700] to-[#ed8413] text-white px-5 py-2 rounded-md hover:opacity-90 transition text-sm font-semibold"
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
