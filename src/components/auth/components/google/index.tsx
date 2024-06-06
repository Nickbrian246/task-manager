import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
interface Props {
  title: string;
}
const GoogleAuthButton = ({ title }: Props) => {
  const router = useRouter();
  const handleBtn = async () => {
    await signIn("google", { redirect: false });
    router.back();
  };
  return (
    <button
      onClick={handleBtn}
      type="button"
      className="flex justify-start items-center gap-4 bg-slate-50 p-3 rounded-lg text-lg"
    >
      <FcGoogle className="text-2xl" /> {title}
    </button>
  );
};

export default GoogleAuthButton;
