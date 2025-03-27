import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt"; // Function to verify JWT

interface DecodedToken {
  role: string; // Define the expected structure of the decoded token
}

export async function getUserRole() {
  const cookieStore = await cookies()
  const token = cookieStore.get("authToken")?.value; // Retrieve token from cookies
  if (!token) return null;

  try {
    const decoded = await verifyToken(token) as DecodedToken; // Decode JWT
    return decoded.role || "GUEST"; // Extract role
  } catch (error) {
    return null;
  }
}
