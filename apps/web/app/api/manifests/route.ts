import { NextResponse } from "next";
import { getAssuranceData } from "@/lib/data";

export async function GET() {
  const data = getAssuranceData();
  return NextResponse.json(data);
}
