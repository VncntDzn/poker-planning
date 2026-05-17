import { PropsWithChildren } from "react"

export default function PrivateLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>
}
