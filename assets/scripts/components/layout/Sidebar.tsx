import useRouter from "../../hooks/useRouter";
import {useTranslation} from "react-i18next";
import {useSecurity} from "../../context/security/security.hooks";
import {
    AdjustmentsVerticalIcon, ArrowRightStartOnRectangleIcon,
    Bars3BottomRightIcon,
    BuildingLibraryIcon,
    HomeModernIcon,
    ListBulletIcon
} from "@heroicons/react/24/outline";

import '../../../styles/sidebar.css';
import {AdjustmentsHorizontalIcon} from "@heroicons/react/16/solid";
import {useTranslator} from "../../hooks/useTranslator";

export default function Sidebar() {
    const {generate} = useRouter();
    const {trans} = useTranslator();
    const {isGranted, isLogged, user} = useSecurity();

    const iconClass = "w-6 h-6";

    return (
        <div
            className="navigation bg-gray-900 relative md:min-h-screen w-screen md:w-3/12 md:max-w-max flex justify-between items-center md:justify-start md:items-start md:block">
            <div className="site--title text-white text-center font-bold p-7 text-2xl">{trans('main.title.label')} </div>

            <label htmlFor="nav-toggle" className="md:hidden p-5 cursor-pointer text-white">
                <Bars3BottomRightIcon className={iconClass} />
            </label>
            <input type="checkbox" id="nav-toggle" className="peer hidden"/>
            <nav
                className="navigation hidden peer-checked:flex peer-checked:absolute peer-checked:top-full peer-checked:z-50 peer-checked:inset-x-0 justify-center items-center flex-col md:justify-start md:block font-bold gap-3 text-white p-5 bg-inherit">
                <a href={generate('app_index')} className="nav__menu__item">
                    <HomeModernIcon className={iconClass} />
                    <span>{trans('main.menu.home.label')}</span>
                </a>
                <a href={generate('app_library_index')} className="nav__menu__item">
                    <BuildingLibraryIcon className={iconClass} />
                    <span>{trans('main.menu.library.label')} </span>
                </a>
                <a href="#" className="nav__menu__item">
                    <ListBulletIcon className={iconClass} />
                    <span>{trans('main.menu.setlists.label')}</span>
                </a>

                {isGranted('ROLE_ADMIN') &&
                    <a href={generate('admin')} className="nav__menu__item">
                        <AdjustmentsVerticalIcon className={iconClass} />
                        <span>{trans('main.menu.admin.label')} </span>
                    </a>
                }

                {isLogged() &&
                    <a href={generate("app_logout")} className="nav__menu__item">
                        <ArrowRightStartOnRectangleIcon className={iconClass} />
                        <span>{trans('main.menu.logout.label')} ({ user?.name })</span>
                    </a>
                }
            </nav>
        </div>
    )
}
