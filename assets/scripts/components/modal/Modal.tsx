import {PropsWithChildren, useState} from "react";

type ModalProps = PropsWithChildren & {
    display?: boolean
}

export default function Modal({children, display = false}: ModalProps) {
    return (
        <>{display &&
            <div className="modal fixed inset-0 w-screen h-screen">
                <div className="modal__container relative w-full h-full">
                    <div className="modal__back absolute inset-0 w-full h-full bg-gray-500 opacity-50"></div>
                    <div className="modal__container absolute inset-0 w-full h-full flex justify-center items-center">
                        {children}
                    </div>
                </div>
            </div>
        }</>
    )
}
