import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IClient from "../models/client";
import Alert from "./alert";
import { addClient } from "../services/services";
interface IProps {
   hasOpenAdd: boolean,
   setHasOpenAdd: Dispatch<SetStateAction<boolean>>,
   setRequestToUpdateData: Dispatch<SetStateAction<boolean>>,
}

const ModalAddClient: React.FC<IProps> = ({ hasOpenAdd, setHasOpenAdd, setRequestToUpdateData }) => {
   const [showModal, setShowModal] = useState<boolean>(false);
   const [alert, setAlert] = useState<boolean>(false);
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const { register, handleSubmit, errors } = useForm<IClient>();
   const onClose = (): void => {
      setHasOpenAdd(false);
   }

   const submittingToServer = async (editedClient: IClient): Promise<any> => {
      await addClient(editedClient.firstName, editedClient.lastName, editedClient.phone, editedClient.avatarUrl)
         .then(r => r && setAlert(true))
         .catch(e => setAlert(false));
      setShowAlert(true);
      setRequestToUpdateData(prev => !prev);
      setTimeout(() => {
         setShowAlert(false);
         onClose();
      }, 2500);
   }
   useEffect(() => {
      setShowModal(hasOpenAdd);
   }, [hasOpenAdd])
   return (
      <>
         {showModal ? (
            <>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                           <h3 className="text-3xl font-semibold text-green-500">
                              Adding new client
                           </h3>
                           {showAlert && <Alert requestReuslt={alert} />}
                        </div>
                        <div className="relative p-6 flex-auto">
                           <form onSubmit={handleSubmit(submittingToServer)}>
                              {errors.firstName ? <p className="text-red-500 font-semibold italic">{errors.firstName.message}</p> : null}
                              <label
                                 htmlFor="firstName"
                                 className="text-sm font-bold text-gray-600 block">First Name</label>
                              <input
                                 type="text"
                                 name="firstName"
                                 id="firstName" ref={register({ required: "required" })}
                                 className="w-full p2-border border-gray-300 rounded mt-1 border-2" />

                              {errors.lastName ? <p className="text-red-500 font-semibold italic pt-2">{errors.lastName.message}</p> : null}
                              <label
                                 htmlFor="lastName"
                                 className="text-sm font-bold text-gray-600 block pt-1">Last Name</label>
                              <input
                                 type="text"
                                 name="lastName"
                                 id="lastName"
                                 ref={register({ required: "required" })}
                                 className="w-full p2-border border-gray-300 rounded mt-1 border-2" />

                              {errors.phone ? <p className="text-red-500 font-semibold italic pt-2">{errors.phone.message}</p> : null}
                              <label
                                 htmlFor="phone"
                                 className="text-sm font-bold text-gray-600 block pt-1">Phone</label>
                              <input
                                 type="tel"
                                 name="phone"
                                 id="phone"
                                 ref={register({
                                    required: "required",
                                    minLength: { value: 10, message: "must be 10 numbers" },
                                    validate: (value) => { return [/[0-9]/].every((pattern) => pattern.test(value)) || "must include only numbers" }
                                 })}
                                 className="w-full p2-border border-gray-300 rounded mt-1 border-2" />

                              <label
                                 htmlFor="avatarUrl"
                                 className="text-sm font-bold text-gray-600 block pt-2">Image url</label>
                              <input
                                 type="text"
                                 name="avatarUrl"
                                 id="avatarUrl"
                                 ref={register}
                                 className="w-full p2-border border-gray-300 rounded mt-1 border-2" />

                              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                 <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                    onClick={onClose}>
                                    Close
                           </button>
                                 <button
                                    className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:opacity-50 mr-1 mb-1"
                                    type="submit"
                                    style={{ transition: "all .15s ease" }}>
                                    Add client
                         </button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
         ) : null}

      </>
   );
}
export default ModalAddClient;