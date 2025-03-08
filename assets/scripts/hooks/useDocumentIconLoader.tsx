import {ReactNode} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile, faFileImage, faFilePdf, faFileWord} from "@fortawesome/free-regular-svg-icons";

type DocumentIconLoaders = {
    getDocumentIcon: (extension: string, props) => ReactNode;
}

export function useDocumentIconLoader(): DocumentIconLoaders {
    const getDocumentIcon = (extension: string, props = {}) => {
        switch (extension) {
            case "pdf":
                return <FontAwesomeIcon icon={faFilePdf} preserveAspectRatio="xMinYmin" {...props} />;
            case "doc":
            case "docx":
                return <FontAwesomeIcon icon={faFileWord} preserveAspectRatio="xMinYmin" {...props} />;
            case "png":
            case "jpg":
            case "jpeg":
                return <FontAwesomeIcon icon={faFileImage} preserveAspectRatio="xMinYmin" {...props} />
            default:
                return <FontAwesomeIcon icon={faFile} preserveAspectRatio="xMinYmin" {...props} />
        }
    }

    return {getDocumentIcon}
}
