import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/model/client/config";
import { error } from "console";

export interface UserPref {
    reputation: number
}

interface AuthStore {
    session: Models.Session | null
    jwt: string | null
    user: Models.User<UserPref> | null
    hydrated: boolean

    sethydrated(): void;
    verifySession(): Promise<void>;

    //login function 
    login(
        email: string,
        password: string,
    ): Promise<{
        success: boolean;
        error?: AppwriteException | null
    }>

    //create account function 
    createAccount(
        name: string,
        // age : number,
        email: string,
        password: string,
    ): Promise<{
        success: boolean;
        error?: AppwriteException | null
    }>

    logout(): Promise<void>
}

export const useAuthStore = create<AuthStore>()(
    persist(
        immer((set) => ({

            // initial state
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            //define methods
            sethydrated() {
                set({ hydrated: true })
            },

            async verifySession() {
                try {
                    const session = await account.getSession("current")
                    set({ session });
                } catch (error) {
                    console.log(error);
                }
            },

            async login(email: string, password: string) {
                try {
                    const session = await account.createEmailPasswordSession(email, password)

                    const [user, { jwt }] = await Promise.all([
                        //geting user , jwt
                        account.get<UserPref>(),
                        account.createJWT()
                    ])

                    if (!user.prefs?.reputation)
                        await account.updatePrefs<UserPref>({
                            reputation: 0
                        })

                    set({ session, user, jwt })

                    return { success: true }
                } catch (error) {
                    console.log(error)
                    return {
                        success: false,
                        error: error instanceof AppwriteException ?
                            error : null
                    }
                }
            },

            async createAccount(name: string, email: string, password: string) {
                try {
                    await account.create(ID.unique(), email, password, name)
                    return { success: true }
                } catch (error) {
                    console.log(error)
                    return {
                        success: false,
                        error: error instanceof AppwriteException ?
                            error : null
                    }
                }
            },

            async logout() {
                try {
                    await account.deleteSessions()
                    set({
                        session: null,
                        jwt: null,
                        user: null,
                      
                    })
                } catch (error) {
                    console.log(error)
                }
            },

        })),
        {
            name: "auth",
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) state?.sethydrated()
                }
            }
        }
    )
)