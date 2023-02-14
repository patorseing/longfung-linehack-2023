type RegisterType = "band" | "event"

type CardValue = {
  picture: string
  title: string
  value: RegisterType
}

export const REGISTER_CARD_DATA: CardValue[] = [
  {
    picture: "/images/band.svg",
    title: "Band",
    value: "band",
  },
  {
    picture: "/images/event.svg",
    title: "Event",
    value: "event",
  },
]
