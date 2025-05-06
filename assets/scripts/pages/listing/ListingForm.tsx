import {Listing, listingSchema} from "../../model/listing/listing.interface";
import {z} from "zod";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardContent, CardHeader, CardTitle} from "../../shadcdn/components/ui/card";
import {Form} from "../../shadcdn/components/ui/form";
import TextInput from "../../components/Form/TextInput";
import {useTranslator} from "../../hooks/useTranslator";
import {useAllScores} from "../../hooks/library/useAllScores";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../shadcdn/components/ui/table";
import {AlignJustifyIcon, MinusIcon} from "lucide-react";
import {useMemo, useState} from "react";
import {isListingScore, ListingScore} from "../../model/listing/listingScore.interface";
import {Button} from "../../shadcdn/components/ui/button";
import {Input} from "../../shadcdn/components/ui/input";
import {Score} from "../../model/library/score.interface";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../shadcdn/components/ui/select";
import {closestCenter, DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DatePicker from "../../components/Form/DatePicker";

const listingFormSchema = listingSchema.merge(
    z.object({
        id: z.string().optional(),
        date: z.date()
    }),
);
export type FormListing = z.infer<typeof listingFormSchema>;
export const BlankListing: FormListing = {
    name: '',
    date: new Date(),
    scores: []
};

export default function ListingForm({listing}: { listing: Listing | null }) {
    const {trans} = useTranslator()
    const {scores: possibleScores} = useAllScores();

    const form = useForm<FormListing>({
        defaultValues: listing ?? BlankListing,
        resolver: zodResolver(listingFormSchema),
        mode: "onSubmit",
    });
    const {
        fields: scores,
        append: appendScore,
        remove: removeScore,
        move: moveScore
    } = useFieldArray({
        control: form.control,
        name: "scores",
    } as const);

    const lastOrder = useMemo<number>(() => {
        if (scores.length === 0) return 0
        return scores[scores.length - 1].order
    }, [scores])

    const [newScore, setNewScore] = useState<Partial<ListingScore>>({})

    const addNewScore = () => {
        const additionalScore = {
            ...newScore,
            id: String(Math.random().toString(36).substring(2, 15)),
            order: lastOrder+1
        }
        if (isListingScore(additionalScore)) {
            appendScore(additionalScore)
            setNewScore({})
        }
    }

    const handleNewScoreScore = (id: string) => {
        const targetScores = possibleScores.filter(s => s.id === id)
        if (targetScores.length !== 1) return

        setNewScore({...newScore, score: targetScores[0]})
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
    );

    function handDragEnd(event) {
        const {active, over} = event
        moveScore(active.id, over.id)
    }

    const onSubmit: SubmitHandler<FormListing> = (listing: FormListing) => {
        const savedListing = {
            ...listing,
            scores: scores.map((s,idx) => ({...s, order: idx}))
        }
        console.log("Saving", savedListing)
    };

    //TODO : translation
    return (
        <>
            <CardHeader>
                <CardTitle>
                    {listing ? (
                        <div>Update de {listing.name}</div>
                    ) : (
                        <div>Création d'un nouveau listing</div>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <TextInput
                            control={form.control}
                            name="name"
                            label={trans("entity.listing.fields.name.label")}
                        />

                        <DatePicker control={form.control} name={"date"} label={"Date"} />

                        <div className="font-bold">Partitions</div>

                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handDragEnd}>
                            <SortableContext items={scores.map((s, idx) => idx)} strategy={verticalListSortingStrategy}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead></TableHead>
                                            <TableHead>Nom</TableHead>
                                            <TableHead>Partition</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {scores.map((score, idx) => (
                                            <SortableListingScore score={score} idx={idx} removeScore={removeScore} key={idx}/>
                                        ))}
                                        <TableRow>
                                            <TableCell>New</TableCell>
                                            <TableCell>
                                                <Input value={newScore?.name ?? ''}
                                                       onChange={(e) => setNewScore({
                                                           ...newScore,
                                                           name: e.target.value
                                                       })}/>
                                            </TableCell>
                                            <TableCell>
                                                <Select onValueChange={handleNewScoreScore}
                                                        value={newScore.score?.id ?? ""}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choisis une partition"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {possibleScores.map((s: Score) => (
                                                            <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Button type="button" onClick={addNewScore} variant="secondary">Ajouter</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </SortableContext>
                        </DndContext>
                        <Button type="submit">Enregistrer</Button>
                    </form>
                </Form>
            </CardContent>
        </>
    )
}


// Using this as base : https://markaicode.com/build-a-drag-and-drop-sortable-list-in-react/
type SortableListingScoreProps = {
    score: ListingScore,
    idx: number,
    removeScore: (idx: number) => void
}
const SortableListingScore = ({score, idx, removeScore}: SortableListingScoreProps) => {
    const {trans} = useTranslator()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: idx});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow key={score.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TableCell><AlignJustifyIcon
                className="h-3 w-3 cursor-grab"/></TableCell>
            <TableCell>{score.name}</TableCell>
            <TableCell>{score.score.title}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2 cursor-pointer"
                     onClick={() => removeScore(idx)}>
                    <MinusIcon className="h-3 w-3 text-red-800"/>
                    {trans("main.action.delete.label")}
                </div>
            </TableCell>
        </TableRow>
    )
}
