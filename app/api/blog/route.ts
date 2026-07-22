import { GET as blogGET, POST as blogPOST } from "../v1/blog/route";

export async function GET(req: any) {
  return blogGET(req);
}

export async function POST(req: any) {
  return blogPOST(req);
}
