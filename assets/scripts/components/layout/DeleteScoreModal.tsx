import {Score} from "../../model/library/score.interface";
import Modal from "../modal/Modal";
import {Card, CardContent, CardFooter, CardTitle} from "../../shadcdn/components/ui/card";
import {TriangleAlertIcon} from "lucide-react";
import {useTranslator} from "../../hooks/useTranslator";
import useDeleteScore from "../../hooks/library/useDeleteScore";
import {useContext} from "react";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";

interface DeleteScoreModalProps {
    score: Score;
    toggleDisplay: () => void;
    deleteScore: (score: Score) => void;
    onSuccess?: () => void;
}

export function DeleteScoreModal({score, toggleDisplay, deleteScore}: DeleteScoreModalProps) {
    const {trans} = useTranslator()

    return (
        <Modal display={true}>
            <Card>
                <CardTitle>
                    <div className="title__title text-red-800 flex items-center gap-5 w-full leading-none">
                        <div><TriangleAlertIcon className="w-5 h-5"/></div>
                        <div>{trans('library.index.deleteModal.title.label')}</div>
                    </div>
                </CardTitle>
                <CardContent>
                    <div className="w-full h-full flex justify-center items-center p-5">
                        {trans('library.index.deleteModal.content.text', {'title': score.title})}
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex justify-end items-center gap-4">
                        <button className="button secondary"
                                onClick={toggleDisplay}>{trans('main.action.cancel.label')}</button>
                        <button className="button danger"
                                onClick={() => deleteScore(score)}>{trans('main.action.delete.label')}</button>
                    </div>
                </CardFooter>
            </Card>
        </Modal>
    )
}
