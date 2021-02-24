import React, { useEffect, useState } from 'react';
import { getClients } from "./services/services";
import Client from "./components/client";
import IClient from "./models/client";
import ModalEditClient from "./components/modalEditClient";
import ModalAddClient from "./components/modalAddClient";

const App: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>();
  const [hasOpenEdit, setHasOpenEdit] = useState<boolean>(false);
  const [hasOpenAdd, setHasOpenAdd] = useState<boolean>(false);
  const [currentClient, setCurrentClient] = useState<IClient | null>(null);
  const [requestToUpdateData, setRequestToUpdateData] = useState<boolean>(false);

  useEffect(() => {
    getClients().then(clients => setClients(clients));
    console.log("Hello")
  }, [requestToUpdateData])

  const handleEditClient = (client: IClient): void => {
    setHasOpenEdit(true);
    setCurrentClient(client);
  }
  const handleAddClient = (): void => {
    setHasOpenAdd(true);
  }
  return (
    <>
      <div className="flex flex-col p-16">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-green-500 sm:rounded-lg">
              <table className="min-w-full divide-y divide-green-500">
                <thead className="bg-green-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Clients
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={handleAddClient}
                        style={{ transition: "all .15s ease" }}>
                        Add new client
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients?.map((client) => <Client client={client} key={client.id} editClient={() => handleEditClient(client)} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {currentClient && <ModalEditClient hasOpenEdit={hasOpenEdit} setHasOpenEdit={setHasOpenEdit} setCurrentClient={setCurrentClient} setRequestToUpdateData={setRequestToUpdateData} client={currentClient} />}
      {hasOpenAdd && <ModalAddClient hasOpenAdd={hasOpenAdd} setHasOpenAdd={setHasOpenAdd} setRequestToUpdateData={setRequestToUpdateData} />}
    </>
  );
}

export default App;
