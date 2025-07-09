// app/api/audit/route.js

import { getAuditLogs } from '@/utils/listingsDb';

export async function GET() {
  return Response.json(getAuditLogs());
}
