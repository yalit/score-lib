import {createContext, PropsWithChildren, useEffect, useState} from "react";

type ActionMenuToggleState = {
    opened: boolean,
    element: string | null
};

const initialState: ActionMenuToggleState = {
    opened: false,
    element: null
};

type ActionMenuToggleFunction = (element: string) => void;

type ActionMenuToggleActions = {
    toggleMenu: ActionMenuToggleFunction;
};

type ActionMenuToggleContextValue = {
    state: ActionMenuToggleState;
    actions: ActionMenuToggleActions;
};

export const actionMenuToggleContext = createContext<ActionMenuToggleContextValue>({
    state: initialState,
    actions: {
        toggleMenu: (element: string) => {},
    },
});

export const ActionMenuToggleProvider = ({children}: PropsWithChildren) => {
    const [state, setState] = useState<ActionMenuToggleState>(initialState);

    const toggleMenu = (element: string) => {
        if (state.opened && state.element === element) {
            setState({opened: false, element: null});
        } else {
            setState({opened: true, element});
        }
    }
    const actionMenuToggleValue = {
        state,
        actions: { toggleMenu },
    };
    return (
        <actionMenuToggleContext.Provider value={actionMenuToggleValue}>{children}</actionMenuToggleContext.Provider>
    );
};
