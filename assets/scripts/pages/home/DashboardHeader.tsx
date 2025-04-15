import ActionCard from "../../components/card/ActionCard";
import useRouter from "../../hooks/useRouter";
import {useLibraryStat} from "../../hooks/library/useLibraryStat";
import {useTranslator} from "../../hooks/useTranslator";
import {FilePlusIcon, FolderPlusIcon} from "lucide-react";

export default function DashboardHeader() {
    const {trans} = useTranslator();
    const {generate} = useRouter()
    const {nbScores, nbLists, nbCreatedInLastWeek} = useLibraryStat()

    return (
        <div className="main__cards w-full grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-7.5">
            <ActionCard title={trans('index.cards.newscores.title')} subtitle={String(nbCreatedInLastWeek)}/>
            <ActionCard title={trans('index.cards.libraryscores.title')} subtitle={String(nbScores)}
                        Icon={<FilePlusIcon className="h-10 w-10"/>}
                        iconText={trans('index.cards.libraryscores.icon.action.label')}
                        actionPath={generate('app_library_score_new')}
            />
            <ActionCard title={trans('index.cards.setlists.title')} subtitle={'n.a.'}
                        Icon={<FolderPlusIcon className="h-10 w-10"/>}
                        //iconText={trans('index.cards.setlists.icon.action.label')}
                        //actionPath={generate('app_index')}
            />
        </div>
    )
}
