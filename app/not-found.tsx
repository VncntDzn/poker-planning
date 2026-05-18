"use client"
import { Button } from "@/common/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/common/ui/card"
import { ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <Card className="w-full max-w-2xl border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border bg-muted">
              <span className="text-4xl font-bold tracking-tight text-muted-foreground">
                404
              </span>
            </div>

            <CardTitle className="text-3xl font-bold tracking-tight sm:text-5xl">
              Page not found
            </CardTitle>

            <CardDescription className="mx-auto mt-3 max-w-md text-base">
              The page you’re looking for doesn’t exist, was moved, or the URL
              may be incorrect.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                variant="ghost"
                type="button"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
              </Button>
            </div>

            <p className="pt-4 text-center text-sm text-muted-foreground">
              Error code: <span className="font-mono">NOT_FOUND</span>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
