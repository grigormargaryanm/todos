import React, {RefObject} from "react";
import {Input, Tooltip, Grid} from "antd";
import {SearchProps} from "antd/lib/input/Search";
import {TooltipPlacement} from "antd/lib/tooltip";
import {FormikErrors} from "formik";

import {StyledFormItem} from "./styles";

const {useBreakpoint} = Grid;

interface Props extends SearchProps {
    success?: boolean;
    error?: string | string[] | FormikErrors<string> | FormikErrors<string>[];
    errorPlacement?: TooltipPlacement;
    isPopupContainerBody?: boolean;
    password?: boolean;
    touched?: boolean;
    label?: string | React.ReactNode;
    inputRef?: RefObject<any>;
}

function FormInput({
                       success,
                       error,
                       errorPlacement,
                       isPopupContainerBody = false,
                       password,
                       touched,
                       className,
                       label,
                       inputRef,
                       loading = false,
                       ...rest
                   }: Props) {
    const screens = useBreakpoint();
    const inputProps = {
        ref: inputRef,
        ...rest,
    };

    const render = () => {
        return password ? (
            <Input.Password {...inputProps}/>
        ) : (
            <Input {...inputProps} />
        );
    };

    const placement = errorPlacement
        ? errorPlacement
        : screens.lg
            ? "right"
            : "top";

    const handleGetPopupContainer = (triggerNode: HTMLElement) => {
        return isPopupContainerBody
            ? document.body
            : (triggerNode.parentNode as HTMLElement);
    };

    return (
        <StyledFormItem
            labelCol={{span: 24}}
            label={label}
            className={className}
            validateStatus={touched && error ? "error" : success ? "success" : ""}
        >
            <Tooltip
                title={touched && error}
                color="red"
                placement={placement}
                overlayStyle={{whiteSpace: "pre-line"}}
                getPopupContainer={handleGetPopupContainer}
            >
                {render()}
            </Tooltip>
        </StyledFormItem>
    );
}

export default FormInput;
