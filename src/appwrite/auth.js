import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'


export class AuthService{
    client = new Client();
    account;

    //constructoe to initialize the url and project ID
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    //create user Account and login accordingly
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            //if user account exist
            if(userAccount){
                return this.login({email, password});
            }
            //return the response if account do not exist
            else{
                return userAccount
            }

        }
        catch(error){
            throw error;
        }
    }

    //Login Service
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch(error){
            throw error;
        }
    }

    //logout
    async logout() {
        try{
            //delete all user account
            await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite Service :: logout :: error", error);
        }
    }

    //isAleadyLoggedIn
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite Service :: getCurrentUser :: error", error);
        }
        return null;
    }
}


const authService = new AuthService();

export default authService;

// const client = new Client()
//     .setEndpoint('')
//     .setProject('');

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(),
//     'email',
//     'password'
// )