import {PropsWithChildren, useContext, useMemo} from "react";
import {
    ChevronDownIcon,
    ChevronsUpDownIcon,
    ChevronUpIcon,
} from "lucide-react";
import {SortableItem, sortContext} from "../../context/global/sortContext";
import {TableHead} from "../../shadcdn/components/ui/table";
import SortingIcon from "./sortingIcon";

type SortableTableHeadProps = PropsWithChildren & { sortItem: SortableItem };
export default function SortableTableHead({
                                              children,
                                              sortItem,
                                          }: SortableTableHeadProps) {
    return (
        <TableHead>
            <div className="flex justify-between">
                <div>{children}</div>
                <SortingIcon sortItem={sortItem}/>
            </div>
        </TableHead>
    );
}
