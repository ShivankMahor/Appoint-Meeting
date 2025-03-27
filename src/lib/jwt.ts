import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // Use a secure key in .env

interface DecodedToken {
  role: string; // Add other properties if needed
}
// Function to verify JWT token
export async function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded as DecodedToken);
    });
  });
}
