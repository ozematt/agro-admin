import { Calendar, Clock, User } from "lucide-react";
import { type Status } from "./StatusBadge";
import { StatusBadge } from "@/components";

const reservations = [
  {
    id: 1,
    date: "2024-09-25",
    time: "14:00",
    client: "Jan Kowalski",
    phone: "+48 123 456 789",
    email: "jan@example.com",
    service: "Konsultacja",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2024-09-26",
    time: "10:30",
    client: "Anna Nowak",
    phone: "+48 987 654 321",
    email: "anna@example.com",
    service: "Sesja zdjęciowa",
    status: "pending",
  },
  {
    id: 3,
    date: "2024-09-27",
    time: "16:15",
    client: "Piotr Wiśniewski",
    phone: "+48 555 666 777",
    email: "piotr@example.com",
    service: "Spotkanie biznesowe",
    status: "confirmed",
  },
];

const Dashboard = () => {
  return (
    <div className="">
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[
          {
            title: "Dzisiejsze rezerwacje",
            value: "5",
            color: "bg-blue-500",
            icon: Calendar,
          },

          {
            title: "Oczekujące Rezerwacje",
            value: "8",
            color: "bg-yellow-500",
            icon: Clock,
          },
        ].map(({ title, value, color, icon: Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-slate-600">{title}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
              </div>
              <div className={`p-3 ${color} rounded-lg`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {reservations.slice(0, 3).map((res) => (
          <div
            key={res.id}
            className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{res.client}</p>
                <p className="text-sm text-slate-600">
                  {res.service} • {res.date} {res.time}
                </p>
              </div>
            </div>
            <StatusBadge status={res.status as Status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
