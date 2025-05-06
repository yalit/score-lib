import {PropsWithChildren} from "react";
import {TableHead} from "../../shadcdn/components/ui/table";
import SortingIcon from "./sortingIcon";
import {SortableItem} from "../../model/global/sorting.interface";

type SortableTableHeadProps = PropsWithChildren & { sortItem: SortableItem, canSort: boolean };
export default function SortableTableHead({
                                              canSort,
                                              children,
                                              sortItem,
                                          }: SortableTableHeadProps) {

    return (
        <TableHead>
            <div className="flex justify-between">
                <div>{children}</div>
                {canSort && <SortingIcon sortItem={sortItem}/>}
            </div>
        </TableHead>
    );
}
