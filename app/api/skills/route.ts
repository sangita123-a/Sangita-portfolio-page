import { GET as skillsGET, POST as skillsPOST } from "../v1/skills/route";

export async function GET(req: any) {
  return skillsGET();
}

export async function POST(req: any) {
  return skillsPOST(req);
}
