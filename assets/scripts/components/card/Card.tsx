import {classnames} from "../../libraries/general";
import {PropsWithChildren} from "react";

import '../../../styles/card.css';

type CardProps = PropsWithChildren & {
    className?: string
}

export default function Card({className, children}: CardProps) {
    const cardClass = classnames("card", className)
    return (
        <div className={cardClass}>
            {children}
        </div>
    )
}
