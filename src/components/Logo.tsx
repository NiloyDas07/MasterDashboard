import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "text-2xl font-black tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent drop-shadow-lg",
        className
      )}
    >
      MasterDashboard
    </div>
  );
};

export default Logo;
