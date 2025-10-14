import { LogOut } from "lucide-react";

type Props = {
  mobile?: boolean;
};

const Logout = ({ mobile }: Props) => {
  return (
    <form>
      <button
        className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-slate-300 ${mobile ? "hover:bg-blue-100" : "hover:bg-slate-800"} `}
      >
        <LogOut />
        Wyloguj
      </button>
    </form>
  );
};

export default Logout;
