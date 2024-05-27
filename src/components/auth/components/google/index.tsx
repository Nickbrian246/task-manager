import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useEffectOnce } from "react-use";
import { saveAuthToken } from "@/utils";

interface Props {
  title: string;
}
const GoogleAuthButton = ({ title }: Props) => {
  const { data, status } = useSession();
  const handleBtn = () => {
    signIn("google");
  };
  console.log({ data: data?.access_token, status }, "soy session ");
  useEffectOnce(() => {
    if (data?.access_token) {
      saveAuthToken(data.access_token);
    }
  });
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
