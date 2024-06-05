import { onCall } from "firebase-functions/v2/https";
import { generateRandomPassword } from "../utils/utils";
import { admin } from "../config/config";


 export const creatNewUSerStaff = onCall(async (request): Promise<ICreateUserResponse> => {
    const data = request.data as TStaff
    const {email, lastName , name } = data

    const password = generateRandomPassword(name, lastName)
    try {
        const responseCreateUser = await admin.auth().createUser({email, password})
        const {uid} = responseCreateUser

        const userDocRef = admin.firestore().collection('staff').doc(uid);

        await userDocRef.set({
            ...data,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return { success: true, uid };

    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
 });