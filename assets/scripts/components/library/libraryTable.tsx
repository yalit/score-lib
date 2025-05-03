import {AnyDirection, SortProvider} from "../../context/global/sortContext";
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
import {DownloadIcon, EyeIcon, SquareXIcon} from "lucide-react";
import TableAction from "../table/tableAction";
import MenuToggler from "../table/menuToggler";
import {ActionMenuToggleProvider} from "../../context/global/toggleContext";
import {ScoreReference} from "../../model/library/scoreReference.interface";
import {Score} from "../../model/library/score.interface";
import useRouter from "../../hooks/useRouter";
import {useContext} from "react";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";
import {ScoreArtist} from "../../model/library/scoreArtist.interface";
import {AllowedSortBy} from "../../repository/library/score.repository";
import {LibraryTablePagination} from "./libraryTablePagination";
import DeleteScoreAction from "./deleteScoreAction";

export default function LibraryTable() {
    const {trans} = useTranslator();
    const {generate} = useRouter()
    const {state: {scores}, actions} = useContext(ScoreTableDataContext)

    const sortColumn = (s: string, direction: AnyDirection) => {
        if (!actions.setCurrentOrder) {return }
        actions.setCurrentOrder({by: s as AllowedSortBy, direction})
    };

    const displayReference = (ref: ScoreReference): string => {
        let display = ref.value

        if (ref.information !== undefined) {
            display += '(' + ref.information + ')'
        }

        return display
    }

    const downloadable = (score: Score): boolean => score.files.length > 0
    const getDownloadUrl = (score: Score): string => {
        if (score.files.length === 1) {
            return generate('app_library_scorefile_download', {score: score.id, scoreFile: score.files[0].name})
        }
        if (score.files.length >= 1) {
            return generate('app_library_scorefile_download_all', {score: score.id})
        }
        return '#'
    }

    return (
        <SortProvider sortFunction={sortColumn}>
            <ActionMenuToggleProvider>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableTableHead
                                sortItem="title">{trans("entity.score.fields.title.label")}</SortableTableHead>
                            <SortableTableHead
                                sortItem="reference">{trans('entity.score.fields.reference.label')}</SortableTableHead>
                            <TableHead>{trans("entity.score.fields.refs.label")}</TableHead>
                            <TableHead>{trans("entity.score.fields.categories.label")}</TableHead>
                            <TableHead>{trans("entity.score.fields.artists.label")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scores.length === 0 &&
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex items-center justify-center gap-2">Loading...</div>
                                </TableCell>
                            </TableRow>
                        }
                        {scores.map((score) => (
                            <TableRow key={score.id}>
                                <TableCell><a
                                    href={generate('app_library_score_show', {id: score.id})}>{score.title}</a></TableCell>
                                <TableCell> {score.reference.value}</TableCell>
                                <TableCell>{score.reference.value} {score.otherReferences.map((ref: ScoreReference) =>
                                    <div
                                        key={score.id + ref.value}>{displayReference(ref)}</div>)}</TableCell>
                                <TableCell>{score.categories.map(cat => cat.value).join(', ')}</TableCell>
                                <TableCell> {score.artists.map((scoreArtist: ScoreArtist) => <div
                                    key={score.id + scoreArtist.artist.name + scoreArtist.type}
                                    className="">{scoreArtist.artist.name} - {trans(scoreArtist.type)}</div>)}</TableCell>
                                <TableCell>
                                    <MenuToggler>
                                        {downloadable(score) && <TableAction href={getDownloadUrl(score)}
                                                     icon={<DownloadIcon className="h-4 w-4"/>}
                                                     label={trans('library.score.download.label')}/>
                                        }
                                        <TableAction href={generate('app_library_score_show', {id: score.id})}
                                                     variant={"show"}/>
                                        <TableAction href={generate('app_library_score_edit', {id: score.id})}
                                                     variant={"edit"}/>
                                        <DeleteScoreAction score={score} deleteScore={actions.deleteScore}/>
                                    </MenuToggler>
                                </TableCell>
                            </TableRow>
                        ))}
                        <LibraryTablePagination />
                    </TableBody>
                </Table>
            </ActionMenuToggleProvider>
        </SortProvider>
    );
}
