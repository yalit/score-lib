import {PropsWithChildren, useContext, useMemo} from "react";
import {
    ChevronDownIcon,
    ChevronsUpDownIcon,
    ChevronUpIcon,
} from "lucide-react";
import {SortableItem, sortContext} from "../../context/global/sortContext";
import {TableHead} from "../../shadcdn/components/ui/table";
import SortingIcon from "./sortingIcon";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";

type SortableTableHeadProps = PropsWithChildren & { sortItem: SortableItem };
export default function SortableTableHead({
                                              children,
                                              sortItem,
                                          }: SortableTableHeadProps) {
    const {state: {canSort}} = useContext(ScoreTableDataContext)

    return (
        <TableHead>
            <div className="flex justify-between">
                <div>{children}</div>
                {canSort && <SortingIcon sortItem={sortItem}/>}
            </div>
        </TableHead>
    );
}
