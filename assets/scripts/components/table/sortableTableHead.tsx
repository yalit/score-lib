import { PropsWithChildren, useContext, useMemo } from "react";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { SortableItem, sortContext } from "../../context/global/sortContext";
import { TableHead } from "../../shadcdn/components/ui/table";

type SortableTableHeadProps = PropsWithChildren & { sortItem: SortableItem };
export default function SortableTableHead({
  children,
  sortItem,
}: SortableTableHeadProps) {
  const { state: sortState, actions: sortActions } = useContext(sortContext);

  const toggleDirection = () => {
    const newDirection =
      sortState.direction === ""
        ? "asc"
        : sortState.direction === "asc"
          ? "desc"
          : "asc";
    sortActions.sort(sortItem, newDirection);
  };

  const chevronClassName = "h-4 w-4 bold";
  const icons = {
    "": (
      <ChevronsUpDownIcon
        className={chevronClassName}
        onClick={toggleDirection}
      />
    ),
    asc: (
      <ChevronUpIcon className={chevronClassName} onClick={toggleDirection} />
    ),
    desc: (
      <ChevronDownIcon className={chevronClassName} onClick={toggleDirection} />
    ),
  };

  const displayIcon = useMemo(() => {
    if (sortState.item !== sortItem) return icons[""];

    return icons[sortState.direction];
  }, [sortState]);
  return (
    <TableHead>
      <div className="flex justify-between">
        <div>{children}</div>
        <span className="mr-4 cursor-pointer" onClick={toggleDirection}>
          {displayIcon}
        </span>
      </div>
    </TableHead>
  );
}
