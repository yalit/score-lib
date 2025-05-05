import useRouter from "../../hooks/useRouter";
import {useTranslator} from "../../hooks/useTranslator";
import {HouseIcon, LibraryIcon, ListIcon, LogOutIcon, MenuIcon, SquareLibraryIcon} from "lucide-react";
import {ReactNode, useMemo, useState} from "react";
import {cn} from "../../shadcdn/lib/utils";
import {useSecurity} from "../../context/security/security.hooks";

import '../../../styles/sidebar.css';

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
            icon: <HouseIcon className={iconClass}/>,
            path: generate('app_index')
        },
        {
            title: trans('main.menu.library.label'),
            icon: <LibraryIcon className={iconClass}/>,
            path: generate('app_library_index')
        },
        {
            title: trans('main.menu.setlists.label'),
            icon: <ListIcon className={iconClass}/>,
            path: generate('app_listing_list')
        },
        {
            title: `${trans('main.menu.logout.label')} ${(user?.name)}`,
            icon: <LogOutIcon className={iconClass}/>,
            path: generate("app_logout"),
            visible: isLogged
        },
    ]

    const menuListClassname: string = useMemo<string>(() => {
        return cn(
            "navigation items-center flex-col md:items-start font-bold gap-2 p-5 bg-inherit absolute top-full inset-x-0 md:relative md:top-0",
            mobileLinksShown ? "flex z-50" : "hidden md:flex",
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
                <MenuIcon className={iconClass} onClick={() => setMobileLinksShown(!mobileLinksShown)}/>
            </div>
            <nav className={menuListClassname}>
                {menuItems.map(({path, icon, title, visible}: MenuItemProps) => {
                    const isDisplayed = !visible || visible();
                    return (
                        <div key={path + title}>{isDisplayed && (
                            <a href={path} className="nav__menu__item" key={String(Math.random()) + title}>
                                {icon && icon}
                                <span className={cn(titleSpanClassname)}>{title}</span>
                            </a>
                        )}</div>
                    )
                })}
            </nav>
        </div>
    )
}

