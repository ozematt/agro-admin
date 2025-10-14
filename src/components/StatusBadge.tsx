import React from "react";

export type Status = "confirmed" | "pending" | "cancelled";

interface Props {
  status: Status;
}

const StatusBadge = ({ status }: Props) => {
  const colors = {
    confirmed: "bg-green-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
  };

  const labels = {
    confirmed: "Potwierdzona",
    pending: "Oczekująca",
    cancelled: "Anulowana",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs text-white ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
