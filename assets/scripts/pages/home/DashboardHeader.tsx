import ActionCard from "../../components/card/ActionCard";
import {useTranslation} from "react-i18next";
import {DocumentPlusIcon, FolderPlusIcon} from "@heroicons/react/24/outline";
import useRouter from "../../hooks/useRouter";
import {useLibraryStat} from "../../hooks/library/useLibraryStat";
import {useTranslator} from "../../hooks/useTranslator";

export default function DashboardHeader() {
    const {trans} = useTranslator();
    const {generate} = useRouter()
    const {nbScores} = useLibraryStat()

    return (
        <div className="main__cards w-full grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-7.5">
            <ActionCard title={trans('index.cards.newscores.title')} subtitle={'0'}/>
            <ActionCard title={trans('index.cards.libraryscores.title')} subtitle={String(nbScores)}
                        Icon={<DocumentPlusIcon className="h-10 w-10"/>}
                        iconText={trans('index.cards.libraryscores.icon.action.label')}
                        actionPath={generate('app_library_score_new')}/>
            <ActionCard title={trans('index.cards.setlists.title')} subtitle={'50'}
                        Icon={<FolderPlusIcon className="h-10 w-10"/>}
                        iconText={trans('index.cards.setlists.icon.action.label')}
                        actionPath={generate('app_index')}/>
        </div>
    )
}
