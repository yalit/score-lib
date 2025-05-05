import {Listing} from "../../model/listing/listing.interface";
import {CardContent, CardHeader, CardTitle} from "../../shadcdn/components/ui/card";
import {ListingScore} from "../../model/listing/listingScore.interface";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../shadcdn/components/ui/table";

export default function ListingDisplay({listing}: { listing: Listing }) {
    //TODO : translation
    return (
        <>
            <CardHeader>
                <CardTitle>{listing.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="font-bold text-lg">Partitions</div>
                <div className="pl-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Reference</TableHead>
                                <TableHead>Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listing.scores.map((listingScore: ListingScore) => (
                                <TableRow>
                                    <TableCell>{listingScore.name}</TableCell>
                                    <TableCell>{listingScore.score.reference.value}</TableCell>
                                    <TableCell>{listingScore.score.title}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </>
    )
}

