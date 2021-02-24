import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IClient from "../models/client";
import Alert from "./alert";
import { updateClient } from "../services/services";
interface IProps {
   hasOpenEdit: boolean,
   setHasOpenEdit: Dispatch<SetStateAction<boolean>>,
   setCurrentClient: Dispatch<SetStateAction<IClient | null>>,
   setUpdateData: Dispatch<SetStateAction<boolean>>,
   client: IClient
}

const ModalEdit: React.FC<IProps> = ({ hasOpenEdit, setHasOpenEdit, setCurrentClient, setUpdateData, client }) => {
   const defaultImgUrl: string = client.avatarUrl ? client.avatarUrl : "";
   const [showModal, setShowModal] = useState<boolean>(false);
   const [alert, setAlert] = useState<boolean>(false);
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const { register, handleSubmit, errors } = useForm<IClient>({
      defaultValues: {
         firstName: client.firstName,
         lastName: client.lastName,
         phone: client.phone,
         avatarUrl: defaultImgUrl
      }
   });
   const onClose = (): void => {
      setHasOpenEdit(false);
      setCurrentClient(null);
   }

   const submittingToServer = async (editedClient: IClient): Promise<any> => {
      await updateClient(client.id, editedClient.firstName, editedClient.lastName, editedClient.phone, editedClient.avatarUrl)
         .then(r => setAlert(true))
         .catch(e => setAlert(false));
      setShowAlert(true);
      setUpdateData(prev => !prev);
      setTimeout(() => {
         setShowAlert(false);
         onClose();
      }, 2500);
   }
   useEffect(() => {
      setShowModal(hasOpenEdit);
   }, [hasOpenEdit])
   return (
      <>
         {showModal ? (
            <>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                           <h3 className="text-3xl font-semibold text-green-500">
                              Сlient editing
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
                                    Save Changes
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
export default ModalEdit;