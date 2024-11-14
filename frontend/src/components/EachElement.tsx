import {Children} from "react";

interface Props {
    render: (item: any, index: number) => JSX.Element;
    of: React.ReactNode[] | any[]
}

export default function EachElement({render, of}: Props) {
    return Children.toArray(of?.map((item, index) => render(item, index)));
}