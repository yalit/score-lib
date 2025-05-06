import {Listing} from "../../model/listing/listing.interface";
import {CardContent, CardHeader, CardTitle} from "../../shadcdn/components/ui/card";
import {ListingScore} from "../../model/listing/listingScore.interface";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../shadcdn/components/ui/table";
import {Button} from "../../shadcdn/components/ui/button";
import {MinusIcon, PenIcon} from "lucide-react";
import useRouter from "../../hooks/useRouter";
import {format} from "date-fns";

export default function ListingDisplay({listing}: { listing: Listing }) {
    const {generate} = useRouter()
    //TODO : translation
    return (
        <>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {listing.name}
                    <div className="actions flex items-center gap-2">
                        <a href={generate('app_listing_edit', {id: listing.id})}><Button variant="outline"><PenIcon className="h-3 w-3"/>Editer</Button></a>
                        <a href=""><Button variant="destructive"><MinusIcon className="h-3 w-3"/>Supprimer</Button></a>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="font-bold text-lg">Date</div>
                <div className="pl-4 text-sm">{format(listing.date, 'dd-MM-yyyy')}</div>
                <div className="font-bold text-lg mt-4">Partitions</div>
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
                                <TableRow key={listingScore.id}>
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

