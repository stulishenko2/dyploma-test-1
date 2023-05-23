import { Formik } from "formik"



const initialValues = {
    name: '',
    category: '',
    id: ''
}

export const CreateProductPage = () => {
    const createProduct = () => {

    }
    return <Formik initialValues={initialValues} onSubmit={createProduct}>

    </Formik>
}