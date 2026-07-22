import { GET as projectsGET, POST as projectsPOST } from "../v1/projects/route";

export async function GET(req: any) {
  return projectsGET(req);
}

export async function POST(req: any) {
  return projectsPOST(req);
}
