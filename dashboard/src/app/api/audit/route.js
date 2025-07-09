// app/api/audit/route.js

import { getAuditLogs } from '@/lib/db';

export async function GET() {
  return Response.json(getAuditLogs());
}
