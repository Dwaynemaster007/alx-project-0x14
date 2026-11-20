import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ title, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-8 py-2 border-2 border-[#E2D609] rounded-full transition-colors duration-300 hover:bg-[#E2D609] hover:text-black ${active ? "bg-[#E2D609] text-black" : ""}`}
    >
      {title}
    </button>
  );
};

export default Button;
