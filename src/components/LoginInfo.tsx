import { Calendar, Settings, Users } from "lucide-react";

const LoginInfo = () => {
  return (
    <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white lg:flex lg:w-1/2">
      <div>
        <h1 className="mb-2 text-4xl font-bold">AdminPanel</h1>
        <p className="text-blue-200">System zarządzania</p>
      </div>

      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <div className="bg-opacity-30 rounded-lg bg-blue-500 p-3">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-semibold">
              Zarządzanie terminarzem
            </h3>
            <p className="text-sm text-blue-200">
              Planuj rezerwacje i spotkania w intuicyjnym kalendarzu
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-opacity-30 rounded-lg bg-blue-500 p-3">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-semibold">Obsługa klientów</h3>
            <p className="text-sm text-blue-200">
              Zarządzaj rezerwacjami i kontaktami w jednym miejscu
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-opacity-30 rounded-lg bg-blue-500 p-3">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-semibold">Pełna kontrola</h3>
            <p className="text-sm text-blue-200">
              Zarządzaj wieloma obiektami z jednego panelu
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm text-blue-200">
        © 2025 AdminPanel. Wszystkie prawa zastrzeżone.
      </div>
    </div>
  );
};

export default LoginInfo;
