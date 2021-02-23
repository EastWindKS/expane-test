import React from 'react';
import IClient from "../models/client";
interface IProps {
   client: IClient,
   editClient: () => void
}

const Client: React.FC<IProps> = ({ client, editClient }) => {
   return (
      <tr>
         <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
               <div className="flex-shrink-0 h-10 w-10">
                  {client.avatarUrl !== null && client.avatarUrl.match(/http/) ? <img className="h-10 w-10 rounded-full" src={client.avatarUrl} alt="" /> : null}
               </div>
               <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                     {client.firstName}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                     {client.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                     {client.phone}
                  </div>
               </div>
            </div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <p
               className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
               onClick={editClient}>Edit</p>
         </td>
      </tr>
   )
};

export default Client;