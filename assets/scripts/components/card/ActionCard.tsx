import Card from "./Card";
import {ReactNode} from "react";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";

type ActionCardProps = {
    title: string;
    subtitle?: string;
    Icon?: ReactNode;
    iconClass?: string;
    iconText?: string;
    actionPath?: string
}

export default function ActionCard({title, subtitle, Icon, iconClass, iconText, actionPath}: ActionCardProps) {
    return (
        <Card>
            <CardTitle>
                <><div className="title__title">{ title }</div><div className="title__subtitle">{ subtitle ?? "" }</div></>
            </CardTitle>
            { (Icon && iconText && actionPath) &&
                <CardContent>
                    <a href={actionPath}>
                        <div className="dashboard__card__action add" >
                            {Icon}
                            <span>{ iconText }</span>
                        </div>
                    </a>
                </CardContent>
            }
        </Card>
    )
}
