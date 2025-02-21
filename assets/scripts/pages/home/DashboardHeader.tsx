import ActionCard from "../../components/card/ActionCard";
import {useTranslation} from "react-i18next";
import {DocumentPlusIcon, FolderPlusIcon} from "@heroicons/react/24/outline";
import useRouter from "../../hooks/useRouter";
import {useLibraryStat} from "../../hooks/library/useLibraryStat";

export default function DashboardHeader() {
    const {t} = useTranslation();
    const {generate} = useRouter()
    const {nbScores} = useLibraryStat()

    return (
        <div className="main__cards w-full grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 2xl:gap-7.5 lg:max-w-[50vw]">
            <ActionCard title={t('index.cards.newscores.title')} subtitle={'0'}/>
            <ActionCard title={t('index.cards.libraryscores.title')} subtitle={String(nbScores)}
                        Icon={<DocumentPlusIcon className="h-10 w-10"/>}
                        iconText={t('index.cards.libraryscores.icon.action.label')}
                        actionPath={generate('app_library_score_new')}/>
            <ActionCard title={t('index.cards.setlists.title')} subtitle={'50'}
                        Icon={<FolderPlusIcon className="h-10 w-10"/>}
                        iconText={t('index.cards.setlists.icon.action.label')}
                        actionPath={generate('app_index')}/>
        </div>
    )
}
