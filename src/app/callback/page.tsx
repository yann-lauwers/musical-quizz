import { auth, requestAccessToken } from "@/components/spotify-actions"
import { z } from "zod"

const searchParamsSchema = z.object({ code: z.string() })
type searchParamsSchemaType = z.infer<typeof searchParamsSchema>

export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams: searchParamsSchemaType }) {
  searchParamsSchema.safeParse(searchParams)

  const refreshToken = await requestAccessToken({ code: searchParams.code })

  console.log({ refreshToken })

  // Mtn que j'ai le refresh token, je peux le stocker dans le local storage ou un cookie (a voir le mieux)

  // Il faut aussi que je vois comment automatiquement rafraichir le token tous les 3600 secs...

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>Callback page</p>
        {/* <button onClick={async () => await auth()}>Auth</button> */}
      </div>
    </main>
  )
}
