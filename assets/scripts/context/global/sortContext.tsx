import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {AnyDirection, SortableItem} from "../../model/global/sorting.interface";

type SortState = {
  direction: AnyDirection;
  item: SortableItem;
};

const initialState: SortState = {
  direction: "",
  item: "",
};

export type SortFunction = (item: SortableItem, direction: AnyDirection) => void;

type SortActions = {
  sort: SortFunction;
};

type SortContextValue = {
  state: SortState;
  actions: SortActions;
};

export const sortContext = createContext<SortContextValue>({
  state: initialState,
  actions: {
    sort: (item: SortableItem, direction: AnyDirection) => {},
  },
});

type SortProviderProps = PropsWithChildren & {
  sortFunction: SortFunction;
};

export const SortProvider = ({ sortFunction, children }: SortProviderProps) => {
  const [state, setState] = useState<SortState>(initialState);

  useEffect(() => {
    sortFunction(state.item, state.direction);
  }, [state]);

  const sort = (item: SortableItem, direction: AnyDirection) => {
    setState({ item, direction });
  };

  const sortValue = {
    state,
    actions: { sort },
  };
  return (
    <sortContext.Provider value={sortValue}>{children}</sortContext.Provider>
  );
};
