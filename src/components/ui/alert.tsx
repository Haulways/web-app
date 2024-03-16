import React, { memo, useEffect } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoIosAlert, IoIosCheckmarkCircle } from "react-icons/io";

export type AlertVariant = "info" | "warn" | "success" | "error";

export type ALERT = {
  title: string;
  variant: AlertVariant;
  onClose?: () => void;
  active: boolean;
};

type Props = {
  alert: ALERT;
};

const Alert = memo(function ({
  alert: { title, variant, onClose, active },
}: Props) {
  const borderColor =
    variant === "success"
      ? "border-green-300"
      : variant === "info"
        ? "border-blue-300"
        : variant === "error"
          ? "border-red-300"
          : "border-yellow-300";

  const bgColor =
    variant === "success"
      ? "bg-green-100"
      : variant === "info"
        ? "bg-blue-100"
        : variant === "error"
          ? "bg-red-100"
          : "bg-yellow-100";

  const icon =
    variant === "error" || variant === "warn" ? (
      <IoIosAlert className={`h-8 w-8 text-red-500`} />
    ) : variant === "success" ? (
      <IoIosCheckmarkCircle className={`h-8 w-8 text-green-500`} />
    ) : (
      <IoIosCheckmarkCircle className={`h-8 w-8 text-blue-500`} />
    );

  useEffect(() => {
    setTimeout(() => {
      onClose && onClose();
    }, 8000);
  }, [title, variant, active]);

  return (
    <div
      className={`rounded-lg p-2 ${
        active ? "flex" : "hidden"
      } items-center border ${borderColor} ${bgColor} w-full space-x-3 md:space-x-5`}
    >
      {icon}

      <span className="w-[75%] text-lg font-medium">{title}</span>

      {onClose && (
        <button
          className="flex items-center justify-center justify-self-end"
          onClick={() => onClose()}
        >
          <GrFormClose className="h-6 w-6" />
        </button>
      )}
    </div>
  );
});

Alert.displayName = "Alert";

export default Alert;
