import {FC} from 'react';
import {Radio} from 'antd';
import type {RadioChangeEvent} from 'antd';
import {Filter} from "../../../../types/ITodos";

type FilterType = {
    setFilter: (filter: Filter) => void
}
const TodosFilter: FC<FilterType> = ({setFilter}) => {
    const onChange = (e: RadioChangeEvent) => {
        setFilter(e.target.value)
    };
    return (
        <Radio.Group onChange={onChange} defaultValue="all">
            <Radio.Button value={Filter.ALL}>All</Radio.Button>
            <Radio.Button value={Filter.REMOVED}>Removed Todos</Radio.Button>
        </Radio.Group>
    )
};

export default TodosFilter;
