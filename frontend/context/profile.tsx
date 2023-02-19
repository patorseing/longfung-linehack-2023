import { Profile } from "@liff/get-profile"
import { Dispatch, SetStateAction, useState } from "react"

import { createCtx } from "@/lib/utils"

type ProfileContext = {
  profile: Profile | undefined
  setProfile: Dispatch<SetStateAction<Profile | undefined>>
}

const profileContext = createCtx<ProfileContext>()
const [, Provider] = profileContext
export const [useProfileContext] = profileContext

export const ProfileContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props

  const [profile, setProfile] = useState<Profile>()

  const contextValue = {
    profile,
    setProfile,
  }

  return <Provider value={contextValue}>{children}</Provider>
}
