import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideReactIconType = ForwardRefExoticComponent<
  LucideProps & RefAttributes<SVGSVGElement>
>;

interface Props {
  Icon: LucideReactIconType;
  title: string;
}

const SectionTitle = ({ Icon, title }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Icon size={20} />
      <h3 className="text-base font-semibold text-slate-900 md:text-xl">
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
