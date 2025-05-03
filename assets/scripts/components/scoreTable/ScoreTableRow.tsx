import {Score} from "../../model/library/score.interface";
import {ScoreArtist} from "../../model/library/scoreArtist.interface";
import {classnames} from "../../libraries/general";
import {ScoreReference} from "../../model/library/scoreReference.interface";
import {Key, useContext, useState} from "react";
import {useTranslator} from "../../hooks/useTranslator";
import useRouter from "../../hooks/useRouter";
import {DownloadIcon, EllipsisIcon, EllipsisVerticalIcon, EyeIcon, PencilIcon, SquareXIcon,} from "lucide-react";
import {DeleteScoreModal} from "../layout/DeleteScoreModal";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";
import TableAction from "../table/tableAction";
import MenuToggler from "../table/menuToggler";

interface ScoreTableRowProps {
    score: Score,
    index: number,
    key: Key
}

export default function ScoreTableRow({score, index}: ScoreTableRowProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {trans} = useTranslator();
    const {generate} = useRouter()
    const {actions} = useContext(ScoreTableDataContext)

    const rowClass = classnames(
        "data__table__line",
        index % 2 === 0 ? 'even' : 'odd'
    )

    const displayReference = (ref: ScoreReference): string => {
        let display = ref.value

        if (ref.information !== undefined) {
            display += '(' + ref.information + ')'
        }

        return display
    }

    const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

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
        <div className={rowClass}>
            <div className="data__table__line-content">
                <div className="data__table__line__item title medium">
                    <div className="data__table__line__item-label">{trans('entity.score.fields.title.label')}</div>
                    <div className="data__table__line__item-value underline"><a
                        href={generate('app_library_score_show', {id: score.id})}>{score.title}</a></div>
                </div>

                <div className="data__table__line__item reference medium">
                    <div className="data__table__line__item-label">{trans('entity.score.fields.reference.label')}</div>
                    <div className="data__table__line__item-value">
                        {score.reference.value}
                    </div>
                </div>

                <div className="data__table__line__item references large">
                    <div className="data__table__line__item-label">{trans('entity.score.fields.refs.label')}</div>
                    <div className="data__table__line__item-value">
                        {score.reference.value} {score.otherReferences.map((ref: ScoreReference) => <div
                        key={score.id + ref.value}>{displayReference(ref)}</div>)}
                    </div>
                </div>

                <div className="data__table__line__item categories medium">
                    <div className="data__table__line__item-label">{trans('entity.score.fields.categories.label')}</div>
                    <div className="data__table__line__item-value">
                        {score.categories.map(cat => cat.value).join(', ')}
                    </div>
                </div>

                <div className="data__table__line__item artists large">
                    <div className="data__table__line__item-label">{trans('entity.score.fields.artists.label')}</div>
                    <div className="data__table__line__item-value">
                        {score.artists.map((scoreArtist: ScoreArtist) => <div
                            key={score.id + scoreArtist.artist.name + scoreArtist.type}
                            className="">{scoreArtist.artist.name} - {trans(scoreArtist.type)}</div>)}
                    </div>
                </div>

            </div>

            <div className="data__table__line-actions">
                <MenuToggler>
                    <TableAction href={getDownloadUrl(score)} icon={<DownloadIcon className="h-4 w-4"/>} label={trans('library.score.download.label')} />
                    <TableAction href={generate('app_library_score_show', {id: score.id})} variant={"show"} />
                    <TableAction href={generate('app_library_score_edit', {id: score.id})} variant={"edit"} />
                    <label htmlFor={score.id + "-action-toggle"} className="cursor-pointer flex items-center gap-1"
                           onClick={toggleDeleteModal}><SquareXIcon
                        className="h-4 w-4"/> {trans('main.action.delete.label')}</label>
                </MenuToggler>
            </div>

            {showDeleteModal &&
                <DeleteScoreModal score={score} deleteScore={actions.deleteScore} toggleDisplay={() => setShowDeleteModal(false)} onSuccess={() => setShowDeleteModal(false)} />
            }
        </div>
    )

}
