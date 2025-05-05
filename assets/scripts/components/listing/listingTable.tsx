import {SortProvider} from "../../context/global/sortContext";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../../shadcdn/components/ui/table";
import SortableTableHead from "../table/sortableTableHead";
import TableAction from "../table/tableAction";
import MenuToggler from "../table/menuToggler";
import {ActionMenuToggleProvider} from "../../context/global/toggleContext";
import {AnyDirection} from "../../model/global/sorting.interface";
import {useContext} from "react";
import {ListingTableDataContext} from "../../context/listing/listingTableDataContext";
import {ListingAllowedSortedby} from "../../repository/listing/listing.repository";
import DeleteListingAction from "./deleteListingAction";
import useRouter from "../../hooks/useRouter";
import {CardContent} from "../../shadcdn/components/ui/card";

export default function ListingTable() {
    const {state: {items: listings, canSort}, actions} = useContext(ListingTableDataContext)
    const {generate} = useRouter()

    const sortColumn = (s: ListingAllowedSortedby, direction: AnyDirection) => {
        actions.setCurrentOrder && actions.setCurrentOrder({by: s, direction})
    };

    return (
        <CardContent>
            <SortProvider sortFunction={sortColumn}>
                <ActionMenuToggleProvider>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <SortableTableHead canSort={canSort} sortItem="name">Name</SortableTableHead>
                                <SortableTableHead canSort={canSort} sortItem="date">Date</SortableTableHead>
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
                                            <TableAction variant={"show"}
                                                         href={generate('app_listing_show', {id: listing.id})}/>
                                            <TableAction variant={"edit"}
                                                         href={generate('app_listing_edit', {id: listing.id})}/>
                                            {actions.deleteItem && <DeleteListingAction listing={listing}
                                                                                        deleteListing={actions.deleteItem}/>}
                                        </MenuToggler>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ActionMenuToggleProvider>
            </SortProvider>
        </CardContent>
    );
}
