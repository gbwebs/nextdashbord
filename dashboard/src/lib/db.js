// utils/listingsDb.js

let listings = [
  { id: 1, title: 'Toyota Fortuner', status: 'pending', location: 'Delhi' },
  { id: 2, title: 'Hyundai Creta', status: 'approved', location: 'Mumbai' },
  { id: 3, title: 'Honda City', status: 'pending', location: 'Bangalore' },
  { id: 4, title: 'BMW X1', status: 'rejected', location: 'Pune' },
  { id: 5, title: 'Maruti Swift', status: 'pending', location: 'Chennai' },
  { id: 6, title: 'Audi A4', status: 'approved', location: 'Ahmedabad' },
  { id: 7, title: 'Skoda Slavia', status: 'rejected', location: 'Lucknow' },
  { id: 8, title: 'Mahindra Thar', status: 'pending', location: 'Goa' },
  { id: 9, title: 'Kia Seltos', status: 'pending', location: 'Hyderabad' },
  { id: 10, title: 'Jeep Compass', status: 'pending', location: 'Indore' },
];

let auditLog = [];

export function getListings() {
  return listings;
}

export function updateListing(id, data, admin = 'admin') {
  const index = listings.findIndex((l) => l.id === Number(id));
  if (index !== -1) {
    const old = listings[index];
    listings[index] = { ...old, ...data };
    auditLog.push({
      timestamp: Date.now(),
      admin,
      action: 'update',
      listingId: id,
      changes: data,
    });
  }
}

export function changeStatus(id, status, admin = 'admin') {
  const index = listings.findIndex((l) => l.id === Number(id));
  if (index !== -1) {
    listings[index].status = status;
    auditLog.push({
      timestamp: Date.now(),
      admin,
      action: status === 'approved' ? 'approve' : 'reject',
      listingId: id,
    });
  }
}

export function getAuditLogs() {
  return auditLog;
}
