import {Key, ReactNode} from "react";
import type {MenuProps} from 'antd';
import {Dropdown, Typography} from "antd";
import {ColumnProps} from "antd/es/table";
import {DeleteOutlined, EditOutlined, MoreOutlined} from "@ant-design/icons";
import dayjs, {Dayjs} from "dayjs";
import {Filter, ITodos, TodoStatus} from "../../types/ITodos";
import {StatusTag} from "../../components";
import {EllipsisButton, SkeletonColumn} from "./styles"

const {Text} = Typography

type Props = {
    isLoading: boolean
}

interface ITitle extends Props {
    title: string;
}

interface IDescription extends Props {
    description: string | undefined;
}

interface IDeadline extends Props {
    deadline: Dayjs | undefined;
}

interface IStatus extends Props {
    status: TodoStatus;
}

interface IActions extends Props {
    todo: ITodos;
    handleCurrentTodo: (todo: ITodos, type?: string) => void;
}

interface ISkeleton extends Props {
    children: ReactNode,
}

const Skeleton = ({children, isLoading}: ISkeleton) => {
    return (
        <SkeletonColumn
            loading={isLoading}
            title={false}
            paragraph={{rows: 1, width: ["55%"], style: {marginBottom: 0}}}
            round
        >
            {children}
        </SkeletonColumn>
    )

}
const Title = ({title, isLoading}: ITitle) => {
    return (
        <Skeleton isLoading={isLoading}>
            <Text strong>{title}</Text>
        </Skeleton>
    );
}
const Description = ({description, isLoading}: IDescription) => {
    return (
        <Skeleton isLoading={isLoading}>
            <Text>{description}</Text>
        </Skeleton>
    );
}
const Deadline = ({deadline, isLoading}: IDeadline) => {
    return (
        <Skeleton isLoading={isLoading}>
            <Text>{dayjs(deadline).format('DD/MM/YYYY')}</Text>
        </Skeleton>
    );
}
const Status = ({status, isLoading}: IStatus) => {
    return (
        <Skeleton isLoading={isLoading}>
            <StatusTag status={status}/>
        </Skeleton>
    );
}
const Actions = ({todo, isLoading, handleCurrentTodo}: IActions) => {

    const disabled: boolean =   todo.status === TodoStatus.REMOVED
    const handleStatusChange = (e: { key: Key }) => {
        switch (e.key) {
            case "edit":
                handleCurrentTodo(todo)
                break;
            case "delete":
                handleCurrentTodo(todo, e.key);
                break;
        }
    };

    const items: MenuProps['items'] = [
        {
            key: 'edit',
            label: "Edit",
            icon: <EditOutlined/>,
            onClick: handleStatusChange,
            disabled
        },
        {
            key: 'delete',
            label: "Delete",
            icon: <DeleteOutlined/>,
            danger: true,
            onClick: handleStatusChange,
            disabled
        },
    ];

    return (
        <Skeleton isLoading={isLoading}>
            <Dropdown trigger={["click"]} menu={{items}}>
                <EllipsisButton
                    data-testid="ellipsis-button"
                    icon={<MoreOutlined/>}
                    type="text"
                />
            </Dropdown>
        </Skeleton>
    );
}

const skeletonData = (size: number) => {
    return new Array(size).fill("").map(
        (_, index): ITodos => ({
            id: `${index}`,
            deadline: dayjs(),
            status: TodoStatus.OVERDUE,
            title: "Title",
            description: "Description",
        })
    );
};
const useGenerateTodoListColumns = (
    isLoading: boolean,
    filter:Filter,
    handleCurrentTodo: (todo: ITodos, type?: string) => void,
): ColumnProps<ITodos>[] => {
    return [
        {
            title: "Title",
            dataIndex: "title",
            width: "20%",
            ellipsis: true,
            render: (_, {title}) => (
                <Title
                    title={title}
                    isLoading={isLoading}
                />
            ),
        },
        {
            title: "Description",
            dataIndex: "updated_at",
            width: "30%",
            render: (_, {description}) => (
                <Description isLoading={isLoading} description={description}/>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "20%",
            render: (_, {status}) => (

                <Status
                    status={status}
                    isLoading={isLoading}
                />
            ),
        },
        {
            title: "Deadline",
            dataIndex: "deadline",
            width: "20%",
            render: (_, {deadline}) => (
                <Deadline
                    deadline={deadline}
                    isLoading={isLoading}
                />
            ),
        },
        {
            title: "",
            dataIndex: "states",
            width: "10%",
            align: "center",
            render: (_, todo) => (
                <Actions
                    todo={todo}
                    isLoading={isLoading}
                    handleCurrentTodo={handleCurrentTodo}
                />
            ),
        },
    ];
}

export {skeletonData, useGenerateTodoListColumns};