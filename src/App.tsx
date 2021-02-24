import React, { useEffect, useState } from 'react';
import { getClients } from "./services/services";
import Client from "./components/client";
import IClient from "./models/client";
import ModalEdit from "./components/modalEditClient";
const tempData = {
  "getClients": [
    {
      "id": "3",
      "firstName": "Bob",
      "lastName": "Dylan",
      "phone": "+1 410 5552311",
      "avatarUrl": null
    },
    {
      "id": "4",
      "firstName": "Isaac",
      "lastName": "Asimov",
      "phone": "+36 016 2751209",
      "avatarUrl": "https://s3.amazonaws.com/photo.goodreads.com/authors/1286862859p5/16667.jpg"
    },
    {
      "id": "1",
      "firstName": "Agent",
      "lastName": "Smith",
      "phone": "1-800-NOCALL",
      "avatarUrl": "https://i.pinimg.com/originals/af/71/bf/af71bf6fad19226f8a08e710e03f7d07.jpg"
    },
    {
      "id": "5",
      "firstName": "Johny",
      "lastName": "Silverhand",
      "phone": "+380971111111",
      "avatarUrl": "https://cyberpunk2077.wiki.fextralife.com/file/Cyberpunk-2077/johnny-silverhand-npc-cyberpunk-2077-wiki-guide.png"
    },
    {
      "id": "7",
      "firstName": "Irina",
      "lastName": "Krav",
      "phone": "+380989898983",
      "avatarUrl": "https://previews.123rf.com/images/aurora72/aurora721606/aurora72160600011/59282570-avatar-girls-icon.jpg"
    },
  ]
}

const App: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>(tempData.getClients);
  const [hasOpenEdit, setHasOpenEdit] = useState<boolean>(false);
  const [currentClient, setCurrentClient] = useState<IClient | null>(null);
  const [updateData, setUpdateData] = useState<boolean>(false);

  useEffect(() => {
    getClients().then(clients => setClients(clients));
    console.log("Hello")
  }, [updateData])

  const handleEditClient = (client: IClient): void => {
    setHasOpenEdit(true);
    setCurrentClient(client);
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
      {currentClient && <ModalEdit hasOpenEdit={hasOpenEdit} setHasOpenEdit={setHasOpenEdit} setCurrentClient={setCurrentClient} setUpdateData={setUpdateData} client={currentClient} />}
    </>
  );
}

export default App;
