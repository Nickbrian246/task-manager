import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface Props {
  title: string;
}
const GoogleAuthButton = ({ title }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleBtn = async () => {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_REDIRECT_URL_PROVIDER,
    });
    setIsLoading(false);
  };
  return (
    <button
      onClick={handleBtn}
      type="button"
      className="flex justify-center items-center gap-4 bg-slate-50 p-3 rounded-lg text-lg relative "
    >
      <FcGoogle className="text-2xl" />
      {title}
      {isLoading && (
        <span className="absolute animate-spin   text-xl">
          <AiOutlineLoading3Quarters className="text-slate-500" />
        </span>
      )}
    </button>
  );
};

export default GoogleAuthButton;
