import {Score} from "../../../model/library/score.interface";
import Card from "../../../components/card/Card";
import CardTitle from "../../../components/card/CardTitle";
import CardContent from "../../../components/card/CardContent";
import useRouter from "../../../hooks/useRouter";
import {ReactNode, useEffect} from "react";
import {useTranslator} from "../../../hooks/useTranslator";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle";
import {MusicalNoteIcon} from "@heroicons/react/24/outline";
import {ScoreFile} from "../../../model/library/scoreFile";

interface ScoreDisplayProps {
    score: Score
}

export default function ScoreDisplay({score}: ScoreDisplayProps) {
    const {generate} = useRouter()
    const {trans} = useTranslator()
    const setTitle = useDocumentTitle()

    useEffect(() => {
        setTitle(score.title)
    }, []);

    return (
        <Card>
            <CardTitle>
                <div className="flex justify-between w-full">
                    <div>{score.title}</div>
                    <a href={generate("app_library_score_edit", {id: score.id})}>{trans("main.action.edit.label")}</a>
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
                        {score.files.map((file: ScoreFile) => <a
                            href={generate('app_library_scorefile_download', {score: score.id, scoreFile: file.id})}
                            target="_blank"
                            key={file["@id"]} className="flex items-center gap-2"><MusicalNoteIcon className="h-5 w-5"/> {file.name}</a>)}
                    </div>
                </ScoreDisplayRow>
            </CardContent>
        </Card>
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
