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
const [total, setTotal] = useState(0);


const fetchListings = async () => {
  const res = await fetch('/api/listing'); // No ?page
  const data = await res.json();
  setListings(data); // Store full list
};

useEffect(() => {
  fetchListings();
}, [page, filter]);




  const handleEditClick = (listing) => {
    setEditId(listing.id);
    setEditData({ title: listing.title, location: listing.location });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

const updateRow = (id, updatedFields) => {
  setListings((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, ...updatedFields } : item
    )
  );
};


const handleAction = async (id, action) => {
  await fetch('/api/listings', {
    method: 'POST',
    body: JSON.stringify({ id, action }),
  });

  const status = action === 'approve' ? 'approved' : 'rejected';
  updateRow(id, { status });
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
const startIndex = (page - 1) * listingsPerPage;
const paginatedListings = filteredListings.slice(
  startIndex,
  startIndex + listingsPerPage
);

const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

useEffect(() => {
  setPage(1);
}, [filter]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Car</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedListings.map((car) => (
              <tr key={car.id} className="border-t">
                <td className="px-6 py-3">{car.title}</td>
                <td className="px-6 py-3 capitalize">{car.status}</td>
                <td className="px-6 py-3">{car.location}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => handleAction(car.id, 'approve')}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(car.id, 'reject')}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleEditClick(car)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    <div className="flex justify-between items-center mt-4">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Previous
  </button>
  <span>
    Page {page} of {totalPages}
  </span>
  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>


      </div>

      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md bg-white rounded shadow p-6">
            <Dialog.Title className="text-lg font-bold mb-4">
              Edit Listing
            </Dialog.Title>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Title"
              />
              <input
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Location"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 px-3 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
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
