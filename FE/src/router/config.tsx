import { ReactNode } from "react";

export type RouteType = {
    index?: boolean,
    path: string,
    element: ReactNode,
    child?: RouteType[],
    label?: Array<string>,
    state?: string,
};