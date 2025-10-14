import { Check, Edit, Mail, Phone, User, Users } from "lucide-react";
import { Status } from "./StatusBadge";
import { SectionTitle, StatusBadge } from "@/components";

// Sample data
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

const UnitReservation = () => {
  return (
    <div className="sectionContainer space-y-6">
      <SectionTitle Icon={Users} title="Ostatnie rezerwacje" />

      <div className="space-y-4">
        {reservations.map((res) => (
          <div key={res.id} className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-slate-900">{res.time}</span>
              <StatusBadge status={res.status as Status} />
            </div>
            <p className="font-medium text-slate-900">{res.client}</p>
            <p className="text-sm text-slate-600">{res.service}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
              <Phone size={14} />
              {res.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail size={14} />
              {res.email}
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex items-center gap-1 rounded bg-green-100 px-3 py-1 text-sm text-green-700 hover:bg-green-200">
                <Check size={14} />
                Potwierdź
              </button>
              <button className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200">
                <Edit size={14} />
                Edytuj
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitReservation;
