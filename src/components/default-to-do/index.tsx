import { BiGridVertical } from "react-icons/bi";
import { defaultToDo } from "./utils/default-to-do";
import { SetStateAction } from "react";

interface Props {
  setIsDirty: React.Dispatch<SetStateAction<boolean>>;
}

const DefaultToDo = ({ setIsDirty }: Props) => {
  return (
    <section className="md:max-w-screen-md w-full  p-2 flex flex-col gap-1 mt-5">
      {defaultToDo.map((toDo) => (
        <div
          key={toDo.toDoId}
          className="flex items-center justify-start p-1 bg-[#1c1917] rounded-md gap-3"
        >
          <span className="text-[#525252] scale-150 cursor-grabbing hover:text-[#e2e8f0] hover:bg-[#262626] rounded">
            <BiGridVertical />
          </span>
          <input
            checked={toDo.status}
            onChange={() => {}}
            type="checkbox"
            className="scale-125"
          />
          <input
            onKeyDown={(e) => {}}
            onBlur={() => {}}
            onFocus={() => {
              setIsDirty(true);
            }}
            className={`
          px-1 
          py-1 
          w-full
          h-auto  
          outline-none 
          bg-[#1c1917] 
          text-white 
          ${toDo.status && "line-through text-zinc-400"}
        `}
            onChange={(e) => {}}
            key={toDo.toDoId}
            value={toDo.name}
            placeholder={toDo.label ?? ""}
            onKeyUp={(e) => {}}
          />
        </div>
      ))}
    </section>
  );
};

export default DefaultToDo;
