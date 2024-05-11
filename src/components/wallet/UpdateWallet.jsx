import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { edit } from '../../api/wallet/EditApi';
import findWallet from '../../api/wallet/findWallet';
import * as Yup from 'yup'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function WalletDetail(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [wallet, setWallet] = useState({
     
        currentType:'',
        description:'',
        name: ''
    })
    useEffect(() => {
        findWallet(id)
        .then((res) => {
            
            setWallet({
                name:res.data.name,
                currentType:res.data.currentType,
                description:res.data.description,
             
            })
        })
    }, [])
   
    return (
        <>   
             
            <Formik enableReinitialize={true}
            initialValues={wallet}

            validationSchema={Yup.object({
                
                currentType: Yup.string().required(),
                description: Yup.string().required(),
                name: Yup.string().required()
            })}
            onSubmit={(value) => {
                edit(value, id)
                .then(() => {
                    toast.success("Update Successfully")
                })
                navigate('/wallet')
            }} 
            >
                <Form className="space-y-4">
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Type</label>
                        <Field name="currentType" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></Field>
                        <ErrorMessage name='currentType' component={'span'}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <Field name="description" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></Field>
                        <ErrorMessage name='description' component={'span'}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <Field name="name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></Field>
                        <ErrorMessage name='name' component={'span'}/>
                    </div>
                    <div className="flex justify-between">
                        <button type='submit' className="w-full mr-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
                    
                    </div>
                </Form>
            </Formik>       
        </>
    );
}
