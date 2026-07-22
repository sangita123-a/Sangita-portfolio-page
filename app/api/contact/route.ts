import { GET as contactGET, POST as contactPOST } from "../v1/contact/route";

export async function GET(req: any) {
  return contactGET(req);
}

export async function POST(req: any) {
  return contactPOST(req);
}
