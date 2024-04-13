import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

const bodySchema = z.object({})

type ResponseData = z.infer<typeof bodySchema>

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const response = bodySchema.safeParse(req.body)

  // If the request body is invalid, return a 400 error with the validation errors
  if (!response.success) {
    const { errors } = response.error

    return res.status(400).json({
      error: { message: "Invalid request", errors },
    })
  }

  const {} = response.data

  res.status(200).json({ message: "Hello from Next.js!" })
}
