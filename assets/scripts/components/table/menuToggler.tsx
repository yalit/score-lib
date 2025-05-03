import {PropsWithChildren, useContext, useMemo, useState} from "react";
import {EllipsisIcon, EllipsisVerticalIcon} from "lucide-react";
import {actionMenuToggleContext} from "../../context/global/toggleContext";

export default function MenuToggler({children, classname}: PropsWithChildren & {classname?: string}) {
    const {state: {opened, element}, actions} = useContext(actionMenuToggleContext);
    const [id, setId] = useState(() => String(Math.random().toString(36).substring(2, 15)));

    const toggle = () => {
        actions.toggleMenu(id);
    }

    const isOpen = useMemo(() => opened && element === id, [opened, element]);
    return (
        <div className={"relative" + classname ? " " + classname : ""}>
            <div onClick={toggle}
                 className="cursor-pointer text-slate-800 peer-checked:hidden">
                <EllipsisIcon className="w-6 h-6"/>
            </div>
            <div onClick={toggle}
                 className="cursor-pointer text-slate-800 hidden peer-checked:block">
                <EllipsisVerticalIcon className="w-6 h-6"/>
            </div>
            {isOpen &&
                <div
                    className="flex absolute top-[75%] right-[25%] z-[100] items-start flex-col font-bold gap-2 p-5 bg-white">
                    {children}
                </div>
            }
        </div>
    )
}