import {Score} from "../../model/library/score.interface";
import {useTranslation} from "react-i18next";
import {ScoreArtist} from "../../model/library/scoreArtist.interface";
import {classnames} from "../../libraries/general";
import {ScoreReference} from "../../model/library/scoreReference.interface";
import {useCallback, useState} from "react";
import Modal from "../modal/Modal";
import Card from "../card/Card";
import CardTitle from "../card/CardTitle";
import {Bars3BottomRightIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import CardContent from "../card/CardContent";
import CardFooter from "../card/CardFooter";

interface ScoreTableRowProps {
    score: Score,
    index: number,
    deleteScore: (score: Score) => void,
}

export default function ScoreTableRow({score, deleteScore, index}: ScoreTableRowProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {t} = useTranslation();

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

    return (
        <div className={rowClass}>
            <div className="data__table__line-content">
                <div className="data__table__line__item title">
                    <div className="data__table__line__item-label">{t('entity.score.fields.title.label')}</div>
                    <div className="data__table__line__item-value underline"><a
                        href="{{ path('app_library_score_show', {id: score.id}) }}">{score.title}</a></div>
                </div>

                <div className="data__table__line__item references">
                    <div className="data__table__line__item-label">{t('entity.score.fields.refs.label')}</div>
                    <div className="data__table__line__item-value">
                        {score.reference.value} {score.otherReferences.map((ref: ScoreReference) => <div key={score.id + ref.value}>{displayReference(ref)}</div>)}
                    </div>
                </div>

                <div className="data__table__line__item categories">
                    <div className="data__table__line__item-label">{t('entity.score.fields.categories.label')}</div>
                    <div className="data__table__line__item-value">
                        {score.categories.map(cat => cat.value).join(', ')}
                    </div>
                </div>

                <div className="data__table__line__item artists">
                    <div className="data__table__line__item-label">{t('entity.score.fields.artists.label')}</div>
                    <div className="data__table__line__item-value">
                        {score.artists.map((scoreArtist: ScoreArtist) => <div key={score.id + scoreArtist.artist.name + scoreArtist.type}
                            className="">{scoreArtist.artist.name} - {t(scoreArtist.type)}</div>)}
                    </div>
                </div>

            </div>
            <div className="data__table__line-actions">
                <label htmlFor={score.id + "-action-toggle"} className="cursor-pointer text-slate-800">
                    <Bars3BottomRightIcon className="w-6 h-6" />
                </label>
                <input type="checkbox" id={score.id + "-action-toggle"} className="peer hidden"/>
                <div
                    className="hidden peer-checked:flex absolute top-[75%] right-[25%] z-[100] items-start flex-col font-bold gap-3 p-5 bg-white">
                    <a href="{{ path('app_library_score_show', {id: this.score.id}) }}">{t('main.action.show.label')}</a>
                    <a href="{{ path('app_library_score_edit', {id: this.score.id}) }}">{t('main.action.edit.label')}</a>
                    <label htmlFor={score.id + "-action-toggle"} className="cursor-pointer" onClick={toggleDeleteModal}>{t('main.action.delete.label')}</label>
                </div>
            </div>

            <Modal display={showDeleteModal}>
                <Card className="min-w-[50%">
                    <CardTitle>
                        <div className="title__title text-red-800 flex items-end gap-5 w-full leading-none">
                            <div><ExclamationTriangleIcon className="w-5 h-5"/></div>
                            <div>{t('library.index.deleteModal.title.label')}</div>
                        </div>
                    </CardTitle>
                    <CardContent>
                        <div className="w-full h-full flex justify-center items-center p-5">
                            {t('library.index.deleteModal.content.text', {'title': score.title})}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-end items-center gap-4">
                            <button className="button secondary" onClick={toggleDeleteModal}>{t('main.action.cancel.label')}</button>
                            <button className="button danger" onClick={console.log}>{t('main.action.delete.label')}</button> {/*TODO : add a deletion api request */}
                        </div>
                    </CardFooter>
                </Card>
            </Modal>
        </div>
    )

}
