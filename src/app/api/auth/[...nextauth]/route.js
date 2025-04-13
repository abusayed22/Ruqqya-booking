import { handlers } from "@/auth";
export const { GET, POST } = handlers;

export const authOptions = {
  // REQUIRED: Whitelist your domains/IPs
  trustHost: true,  // For development only
  // OR for production:
  hostWhitelist: [
    '192.168.10.212', 
    'localhost',
    'yourdomain.com'
  ],
  
  secret: process.env.NEXTAUTH_SECRET
}