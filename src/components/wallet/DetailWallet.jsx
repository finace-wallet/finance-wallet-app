import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useLocation, useParams } from 'react-router-dom';
import { edit } from '../../api/wallet/EditApi';
import findWallet from '../../api/wallet/findWallet';
import * as Yup from 'yup'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { deleteApi } from '../../api/wallet/DeleteApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from 'react';

export default function WalletDetail(){
   
    const wallet = useLocation().state;  
    const handleDelete = () => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa?',
            buttons: [
              {
                label: 'Xóa',
                onClick: () => {
                  deleteApi(wallet.id)
                }
              },
              {
                label: 'Hủy',
                onClick: () => {
                
                }
              }
            ]
          });
    }
    return (
        <>   
             
            <Formik 
            initialValues={{
                icon: wallet.icon,
                amount:wallet.amount,
                currentType:wallet.currentType,
                description:wallet.description,
                name: wallet.name
            }}

            validationSchema={Yup.object({
                icon: Yup.string().required(),
                amount: Yup.string().required(),
                currentType: Yup.string().required(),
                description: Yup.string().required(),
                name: Yup.string().required()
            })}
            onSubmit={(value) => {
                console.log(value);
                // edit(value, id)
            }} 
            >
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Icon</label>
                        <Field name="icon" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></Field>
                        <ErrorMessage name='icon' component={'span'}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <Field name="amount" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></Field>
                        <ErrorMessage name='amount' component={'span'}/>
                    </div>
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
                        <button type='button' className="w-full ml-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => {handleDelete()}}>Delete</button>
                    </div>
                </Form>
            </Formik>       
        </>
    );
}
