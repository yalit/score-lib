import { AnyDirection, SortProvider } from "../../context/global/sortContext";
import { useAllListings } from "../../hooks/listing/useAllListings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadcdn/components/ui/table";
import SortableTableHead from "../table/sortableTableHead";
export default function ListingTable() {
  const { listings } = useAllListings();

  const sortColumn = (s: string, direction: AnyDirection) => {
    console.log("Sorting", s, direction);
  };

  return (
    <SortProvider sortFunction={sortColumn}>
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
              <TableCell>...TBD</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SortProvider>
  );
}
