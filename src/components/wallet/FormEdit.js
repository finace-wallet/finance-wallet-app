import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useParams } from 'react-router-dom';
import { edit } from '../../api/wallet/EditApi';

export default function FormEdit(props){
    const {id} = props
    return (
        <>
            {console.log(useParams().id)}
            <Formik 
            initialValues={{
                icon: "a",
                amount:"",
                currentType:"",
                description:"",
                name: ""
            }}
            onSubmit={(value) => {
                edit(value, id)
            }}
            >
                <Form>
                    icon<Field name="icon"></Field>
                    amount<Field name="amount"></Field>
                    currentType<Field name="currentType"></Field>
                    description<Field name="descriptiton"></Field>
                    name <Field name="name"></Field>
                    <button>Sửa</button>
                </Form>
            </Formik>
            
        </>

    );
}