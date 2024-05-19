"use client";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  const { isLoading } = useAppSelector((state) => state.sessionState);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setLoader(true);
    } else {
      const debounce = setTimeout(() => {
        setLoader(false);
      }, 2000);
      return () => clearTimeout(debounce);
    }
  }, [isLoading]);

  return (
    loader && (
      <section className="fixed bottom-10 right-10 flex gap-5">
        <div className="animate-spin text-white text-3xl">
          <AiOutlineLoading3Quarters />
        </div>
        <p className="text-slate-400">{isLoading ? "Guardando" : "Guardado"}</p>
      </section>
    )
  );
};

export default Loading;
