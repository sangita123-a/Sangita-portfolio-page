import { GET as profileGET, PUT as profilePUT } from "../v1/profile/route";

export async function GET(req: any) {
  return profileGET();
}

export async function PUT(req: any) {
  return profilePUT(req);
}
