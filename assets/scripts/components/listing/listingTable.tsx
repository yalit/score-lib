import {AnyDirection, SortProvider} from "../../context/global/sortContext";
import {useAllListings} from "../../hooks/listing/useAllListings";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../shadcdn/components/ui/table";
import SortableTableHead from "../table/sortableTableHead";
import {useTranslator} from "../../hooks/useTranslator";
import {EyeIcon} from "lucide-react";
import TableAction from "../table/tableAction";
import MenuToggler from "../table/menuToggler";
import {ActionMenuToggleProvider} from "../../context/global/toggleContext";

export default function ListingTable() {
    const {trans} = useTranslator();
    const {listings} = useAllListings();

    const sortColumn = (s: string, direction: AnyDirection) => {
        console.log("Sorting", s, direction);
    };

    return (
        <SortProvider sortFunction={sortColumn}>
            <ActionMenuToggleProvider>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableTableHead sortItem="name">Name</SortableTableHead>
                            <SortableTableHead sortItem="date">Date</SortableTableHead>
                            <TableHead>Nb Items</TableHead>
                            <TableHead>Actions...</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listings.map((listing) => (
                            <TableRow key={listing.id}>
                                <TableCell>{listing.name}</TableCell>
                                <TableCell>{listing.date.toLocaleDateString("fr-BE")}</TableCell>
                                <TableCell>{listing.scores.length}</TableCell>
                                <TableCell>
                                    <MenuToggler classname={"text-right"}>
                                        <TableAction variant={"show"}/>
                                        <TableAction variant={"edit"}/>
                                        <TableAction variant={"delete"}/>
                                    </MenuToggler>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ActionMenuToggleProvider>
        </SortProvider>
    );
}
