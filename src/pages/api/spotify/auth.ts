import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const response = bodySchema.safeParse(req.body)

  const body = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: "http://localhost:3000/callback",
    scope: "user-read-currently-playing+user-top-read",
  }

  const response = await fetch("https://accounts.spotify.com/authorize", { method: "POST", body: JSON.stringify(body) })

  const parsedResponse = response.json()

  console.log(parsedResponse)

  // If the request body is invalid, return a 400 error with the validation errors
  // if (!response.success) {
  //   const { errors } = response.error

  //   return res.status(400).json({
  //     error: { message: "Invalid request", errors },
  //   })
  // }

  // const {} = response.data

  res.status(200).json({ message: "Hello from Next.js!" })
}
