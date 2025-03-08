import useRouter from "../../hooks/useRouter";
import {useTranslator} from "../../hooks/useTranslator";
import {SquareLibraryIcon} from "lucide-react";
import {
    ArrowRightStartOnRectangleIcon,
    Bars3BottomRightIcon,
    BuildingLibraryIcon,
    HomeModernIcon,
    ListBulletIcon
} from "@heroicons/react/24/outline";

import '../../../styles/sidebar.css';
import {ReactNode, useMemo, useState} from "react";
import {cn} from "../../shadcdn/lib/utils";
import {useSecurity} from "../../context/security/security.hooks";

export type MenuItemProps = {
    title: string;
    icon?: ReactNode;
    path: string;
    visible?: () => boolean;
}

export default function Sidebar() {
    const [titleDisplayed, setTitleDisplayed] = useState(true);
    const [mobileLinksShown, setMobileLinksShown] = useState(false);

    const {generate} = useRouter();
    const {trans} = useTranslator();
    const {isLogged, user} = useSecurity();

    const iconClass = "w-6 h-6";

    const menuItems: MenuItemProps[] = [
        {
            title: trans('main.menu.home.label'),
            icon: <HomeModernIcon className={iconClass}/>,
            path: generate('app_index')
        },
        {
            title: trans('main.menu.library.label'),
            icon: <BuildingLibraryIcon className={iconClass}/>,
            path: generate('app_library_index')
        },
        {title: trans('main.menu.setlists.label'), icon: <ListBulletIcon className={iconClass}/>, path: "#"},
        {
            title: `${trans('main.menu.logout.label')} ${(user?.name)}`,
            icon: <ArrowRightStartOnRectangleIcon className={iconClass}/>,
            path: generate("app_logout"),
            visible: isLogged
        },
    ]

    const menuListClassname: string = useMemo<string>(() => {
        return cn(
            "navigation items-center flex-col md:items-start font-bold gap-2 p-5 bg-inherit absolute top-full z-50 inset-x-0 md:relative md:top-0",
            mobileLinksShown ? "flex" : "hidden md:flex",
        )

    }, [mobileLinksShown])

    const titleSpanClassname: string = useMemo<string>(() => {
        return cn(
            titleDisplayed ? "block" : "md:hidden",
        )
    }, [titleDisplayed])

    return (
        <div
            className="navigation bg-gray-900 text-white relative md:min-h-screen w-screen md:w-3/12 md:max-w-max flex justify-between items-center md:justify-start md:items-start md:block">
            <button
                className="flex items-center gap-2 site--title text-center font-bold px-5 py-7 text-2xl cursor-pointer"
                onClick={() => setTitleDisplayed(!titleDisplayed)}>
                <SquareLibraryIcon className={iconClass}/>
                <span className={cn(titleSpanClassname)}> {trans('main.title.label')}</span>
            </button>

            <div className="md:hidden p-5 cursor-pointer">
                <Bars3BottomRightIcon className={iconClass} onClick={() => setMobileLinksShown(!mobileLinksShown)}/>
            </div>
            <nav className={menuListClassname}>
                {menuItems.map(({path, icon, title, visible}: MenuItemProps) => {
                    const isDisplayed = !visible || visible();
                    return (
                        <>{isDisplayed && (
                            <a href={path} className="nav__menu__item" key={title}>
                                {icon && icon}
                                <span className={cn(titleSpanClassname)}>{title}</span>
                            </a>
                        )}</>
                    )
                })}
            </nav>
        </div>
    )
}
