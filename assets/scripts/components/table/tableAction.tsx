import {useTranslator} from "../../hooks/useTranslator";
import {EyeIcon, PencilIcon, SquareXIcon} from "lucide-react";
import {useMemo} from "react";

type TableActionProps = {
    href?: string;
    variant?: "show" | "edit" | "delete";
    label?: string;
    icon?: JSX.Element;
}

export default function TableAction({href, variant, label, icon}: TableActionProps) {
    const {trans} = useTranslator();

    const variants = {
        "show": {
            icon: <EyeIcon className="h-4 w-4"/>,
            label: "main.action.show.label",
        },
        "edit": {
            icon: <PencilIcon className="h-4 w-4"/>,
            label: "main.action.edit.label",
        },
        "delete": {
            icon: <SquareXIcon className="h-4 w-4"/>,
            label: "main.action.delete.label",
        },
    }

    const iconDisplay = useMemo(() => {
        if (icon) return icon;
        if (variant !== undefined) return variants[variant].icon;
        return null;
    }, [icon, variant]);

    const labelDisplay = useMemo(() => {
        if (label) return label;
        if (variant !== undefined) return trans(variants[variant].label);
        return null;
    }, [label, variant]);

    return  (
        <a href={href ?? ""} className="flex items-center gap-1">
            {iconDisplay}
            {labelDisplay}
        </a>
    )
}