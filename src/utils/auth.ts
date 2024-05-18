import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const SessionPayloadSchema = z.object({
  spotify_access_token: z.string(),
  spotify_refresh_token: z.string(),
  expires_at: z.date(),
});

type SessionPayload = z.infer<typeof SessionPayloadSchema>;

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export const getSession = () => {
  return cookies().get("session")?.value ?? "";
};

export const deleteSession = () => {
  cookies().delete("session");
};
