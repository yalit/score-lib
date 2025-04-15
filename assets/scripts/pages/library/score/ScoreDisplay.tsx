import {Score} from "../../../model/library/score.interface";
import Card from "../../../components/card/Card";
import CardTitle from "../../../components/card/CardTitle";
import CardContent from "../../../components/card/CardContent";
import useRouter from "../../../hooks/useRouter";
import {ReactNode, useEffect, useState} from "react";
import {useTranslator} from "../../../hooks/useTranslator";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle";
import {ScoreFile} from "../../../model/library/scoreFile";
import {useDocumentIconLoader} from "../../../hooks/useDocumentIconLoader";
import {DeleteScoreModal} from "../../../components/layout/DeleteScoreModal";
import {useRedirect} from "../../../hooks/useRedirect";
import useDeleteScore from "../../../hooks/library/useDeleteScore";

interface ScoreDisplayProps {
    score: Score
}

export default function ScoreDisplay({score}: ScoreDisplayProps) {
    const {generate} = useRouter()
    const {trans} = useTranslator()
    const setTitle = useDocumentTitle()
    const {getDocumentIcon} = useDocumentIconLoader()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const redirect = useRedirect()
    const deleteScore = useDeleteScore('')

    useEffect(() => {
        setTitle(score.title)
    }, []);

    return (
        <>
            <Card>
                <CardTitle>
                    <div className="flex justify-between w-full">
                        <div>{score.title}</div>
                        <div className="text-base font-normal flex items-center gap-2">
                            <a href={generate("app_library_score_edit", {id: score.id})}>{trans("main.action.edit.label")}</a>
                            <button onClick={() => setShowDeleteModal(true)}
                                    className="text-red-600">{trans("main.action.delete.label")}</button>
                        </div>
                    </div>
                </CardTitle>
                <CardContent>
                    <ScoreDisplayRow title={trans('entity.score.fields.reference.label')}>
                        <div>{score.reference.value}</div>
                    </ScoreDisplayRow>
                    <ScoreDisplayRow title={trans('entity.score.fields.refs.label')}>
                        <div>{score.otherReferences.map(ref => <div
                            key={ref.value + "-" + (ref.information ?? "info")}>{ref.value} ({ref.information})</div>)}</div>
                    </ScoreDisplayRow>
                    <ScoreDisplayRow title={trans('entity.score.fields.categories.label')}>
                        <div>{score.categories.map(category => <div key={category.value}>{category.value}</div>)}</div>
                    </ScoreDisplayRow>
                    <ScoreDisplayRow title={trans('entity.score.fields.artists.label')}>
                        <div>{score.artists.map(artist => (
                            <div
                                key={artist.artist.name + "-" + artist.type}>{trans(artist.type)} : {artist.artist.name}</div>
                        ))}</div>
                    </ScoreDisplayRow>
                    <ScoreDisplayRow title={trans('entity.score.fields.files.label')}>
                        <div>
                            {score.files.length > 1 && (
                                <a key="all_file_download"
                                   href={generate('app_library_scorefile_download_all', {score: score.id})}
                                   target="_blank">{trans('library.score.download_all.label')}</a>
                            )}
                            {score.files.map((file: ScoreFile) => <a
                                href={generate('app_library_scorefile_download', {score: score.id, scoreFile: file.id})}
                                target="_blank"
                                key={file.id}
                                className="flex items-center gap-2">{getDocumentIcon(file.extension, {className: "h-5 w-5"})} {file.name}</a>)}
                        </div>
                    </ScoreDisplayRow>
                </CardContent>
            </Card>
            {showDeleteModal && <DeleteScoreModal score={score} toggleDisplay={() => setShowDeleteModal(false)} deleteScore={deleteScore}
                                                  onSuccess={() => redirect(generate('app_library_index'))}
            />}
        </>
    )
}

type ScoreDisplayRowProps = {
    title: string,
    children: ReactNode
}
const ScoreDisplayRow = ({title, children}: ScoreDisplayRowProps) => (
    <div className="flex gap-2 mb-1">
        <div className="w-[100px] font-semibold">
            {title}
        </div>
        {children}
    </div>
)
