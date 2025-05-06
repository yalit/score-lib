import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogTitle,
    DialogTrigger
} from "../../shadcdn/components/ui/dialog";
import {Score} from "../../model/library/score.interface";
import {SquareXIcon, TriangleAlertIcon} from "lucide-react";
import {useTranslator} from "../../hooks/useTranslator";

type DownloadScoreActionProps = {
    score: Score,
    deleteScore: (score: Score) => void,
    withIcon?: boolean
}

export default function DeleteScoreAction({score, deleteScore, withIcon=true}: DownloadScoreActionProps) {
    const {trans} = useTranslator()

    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center gap-2">
                    {withIcon && <SquareXIcon className="h-4 w-4"/>}{trans('main.action.delete.label')}
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="title__title text-red-800 flex items-center gap-5 w-full leading-none">
                            <div><TriangleAlertIcon className="w-5 h-5"/></div>
                            <div>{trans('library.index.deleteModal.title.label')}</div>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full h-full flex justify-center items-center p-5">
                    {trans('library.index.deleteModal.content.text', {'title': score.title})}
                </div>
                <DialogFooter className="w-full flex justify-end items-center gap-4">
                    <DialogClose className="button secondary"> {trans('main.action.cancel.label')}</DialogClose>
                    <DialogClose className="button danger" onClick={() => {
                        deleteScore(score)
                    }}>{trans('main.action.delete.label')} </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}