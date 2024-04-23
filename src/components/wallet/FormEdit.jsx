import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useParams } from 'react-router-dom';
import { edit } from '../../api/wallet/EditApi';


export default function FormEdit(props){

    return (
        <>         
            <Formik 
            initialValues={{
                icon: "",
                amount:"",
                currentType:"",
                description:"",
                name: ""
            }}
            onSubmit={(value) => {
                
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