"use client";

import toast from "react-hot-toast";

type Prop = { error?: boolean };

const ErrorToast = ({ error }: Prop) => {
  if (error) {
    toast.error("Coś poszło nie tak!");
  }

  return <></>;
};

export default ErrorToast;
