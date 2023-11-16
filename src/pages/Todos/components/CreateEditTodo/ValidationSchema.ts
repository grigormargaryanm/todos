import * as Yup from "yup";

const validationSchema = Yup.object({
    id: Yup.string(),
    title: Yup.string().required("Title field is required"),
    description: Yup.string().notRequired(),
    deadline: Yup.date().notRequired(),
    status: Yup.string().notRequired(),
});


export {validationSchema};