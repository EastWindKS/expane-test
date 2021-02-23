import { request, gql } from 'graphql-request';
import IClient from "../models/client";
const endpoint = "https://test-task.expane.pro/api/graphql";

export const getClients = async ():Promise<IClient[]> => {
  const query = gql`
   query  {
    getClients {
     id,
     firstName,
     lastName,
     phone,
     avatarUrl
   }
 }
 ` 
return await request(endpoint, query).then((clients)=>clients.getClients).catch(e=>console.log(e));
}

export const updateClient = async (id:string,firstName:string,lastName:string,phone:string,avatarUrl:string | null=""):Promise<IClient> =>{
  const mutation = gql`
    mutation updateClient($id:ID!,$firstName:String,$lastName:String,$phone:String,$avatarUrl:String) {
      updateClient(id:$id,firstName:$firstName,lastName:$lastName,phone:$phone,avatarUrl:$avatarUrl) {
        id,
        firstName,
        lastName,
        phone,
        avatarUrl
      }
    }   
  `
  const variables = {
    id,
    firstName,
    lastName,
    phone,
    avatarUrl
  }
  return await request(endpoint, mutation,variables).then(client=>client).catch(e=>console.log(e));
}
