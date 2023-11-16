import {FC} from "react";
import {Tag} from "antd";
import {TodoStatus} from "../../types/ITodos";

type StatusTagType = {
    status: TodoStatus
}
const StatusTag: FC<StatusTagType> = ({status}) => {
    const statusColor: Record<string, "success" | "warning" | "default" | "error"> = {
        [TodoStatus.COMPLETED]: "success",
        [TodoStatus.REMOVED]: "error",
        [TodoStatus.PENDING]: "warning",
        [TodoStatus.OVERDUE]: "default",
    };

    return (
        <Tag color={statusColor[status]}>{status}</Tag>
    );
};

export default StatusTag;