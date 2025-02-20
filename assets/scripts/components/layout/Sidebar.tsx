import useRouter from "../../hooks/useRouter";
import {useTranslation} from "react-i18next";
import '../../../styles/sidebar.css'
;
export default function Sidebar() {
    const {generate} = useRouter();
    const {t} = useTranslation();

    return (
        <div className="navigation bg-gray-900 relative md:min-h-screen w-screen md:w-3/12 md:max-w-max flex justify-between items-center md:justify-start md:items-start md:block">
            <div className="site--title text-white text-center font-bold p-7 text-2xl">{ t('main.title.label') } </div>

            <label htmlFor="nav-toggle" className="md:hidden p-5 cursor-pointer text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </label>
            <input type="checkbox" id="nav-toggle" className="peer hidden"/>
            <nav
                className="navigation hidden peer-checked:flex peer-checked:absolute peer-checked:top-full peer-checked:z-50 peer-checked:inset-x-0 justify-center items-center flex-col md:justify-start md:block font-bold gap-3 text-white p-5 bg-inherit">
                <a href="{{ path('app_index') }}" className="nav__menu__item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"></path>
                    </svg>
                    <span>{ t('main.menu.home.label') }</span>
                </a>
                <a href="{{ path('app_library_index') }}" className="nav__menu__item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"></path>
                    </svg>
                    <span>{ t('main.menu.library.label')} </span>
                </a>
                <a href="#" className="nav__menu__item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                    </svg>
                    <span>{ t('main.menu.setlists.label')}</span>
                </a>
{/*
                {% if is_granted('ROLE_ADMIN') %}
                <a href="{{ path('admin') }}" className="nav__menu__item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"></path>
                    </svg>
                    <span>{ t('main.menu.admin.label') } </span>
                </a>
                {% endif %}

                {% if app.user %}
                <a href="{{ path('app_logout') }}" className="nav__menu__item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"></path>
                    </svg>
                    <span>{ t('main.menu.logout.label') } ({{ app.user.name }})</span>
                </a>
                {% endif %}
*/}
            </nav>
        </div>
    )
}
