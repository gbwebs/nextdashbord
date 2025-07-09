// app/api/listings/route.js

import { 
  getListings, 
  updateListing, 
  changeStatus 
} from '@/lib/db';

// GET /api/listings - return full list
export async function GET() {
  const listings = getListings();
  return Response.json(listings);
}

// POST /api/listings - handle approve/reject/update
export async function POST(req) {
  try {
    const body = await req.json();
    const { id, action, data } = body;
    const admin = 'admin'; // Optional: derive from auth cookie

    if (!id || !action) {
      return Response.json({ error: 'Missing id or action' }, { status: 400 });
    }

    if (action === 'approve') {
      changeStatus(id, 'approved', admin);
    } else if (action === 'reject') {
      changeStatus(id, 'rejected', admin);
    } else if (action === 'update') {
      updateListing(id, data, admin);
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 500 });
  }
}
