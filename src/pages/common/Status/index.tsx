import React, { memo } from "react";

export type Status_Variant =
  | "success"
  | "captured"
  | "paid"
  | "fulfilled"
  | "live"
  | "enabled"
  | "published"
  | "completed"
  | "accepted"
  | "awaiting"
  | "pending"
  | "cancelled"
  | "failed"
  | "disabled";

export type Status = {
  title: string;
  variant: Status_Variant;
  active: boolean;
  className: string;
  background: boolean;
  border: boolean;
};

const Status = memo(function ({
  title,
  variant,
  active,
  className,
  background,
  border,
}: Status) {
  const bgColor =
    variant === "success" ||
    variant === "paid" ||
    variant === "completed" ||
    variant === "fulfilled" ||
    variant === "published" ||
    variant === "live" ||
    variant === "enabled" ||
    variant === "accepted" ||
    variant === "captured"
      ? "bg-green-500"
      : variant === "failed" ||
          variant === "cancelled" ||
          variant === "disabled"
        ? "bg-red-500"
        : "bg-gray-500";

  const borderColor =
    variant === "success" ||
    variant === "paid" ||
    variant === "completed" ||
    variant === "published" ||
    variant === "live" ||
    variant === "enabled" ||
    variant === "fulfilled" ||
    variant === "accepted" ||
    variant === "captured"
      ? "border-green-500"
      : variant === "failed" ||
          variant === "cancelled" ||
          variant === "disabled"
        ? "border-red-500"
        : "border-gray-500";

  return (
    <div
      className={`rounded-md flex space-x-2 ${
        border ? `border ${borderColor}` : ""
      } items-center ${background ? bgColor : ""}`}
    >
      <div className={`flex h-1.5 w-1.5 rounded-full ${bgColor}`} />
      <span className="text-xs md:text-sm">{title}</span>
    </div>
  );
});

export default Status;
