import { Dispatch, SetStateAction, useState } from "react";

import { createCtx } from "@/lib/utils";

type PictureContext = {
  bandPreview: string;
  qrPreview: string;
  eventPreview: string;
  setEventPreview: Dispatch<SetStateAction<string>>;
  setBandPreview: Dispatch<SetStateAction<string>>;
  setQrPreview: Dispatch<SetStateAction<string>>;
};

const filterContext = createCtx<PictureContext>();
const [, Provider] = filterContext;
export const [usePictureContext] = filterContext;

export const PictureContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props;

  const [bandPreview, setBandPreview] = useState("");
  const [qrPreview, setQrPreview] = useState("");
  const [eventPreview, setEventPreview] = useState("");
  const contextValue = {
    eventPreview,
    bandPreview,
    qrPreview,
    setBandPreview,
    setQrPreview,
    setEventPreview,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};
