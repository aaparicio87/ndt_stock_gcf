"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserStaff = exports.creatNewUSerStaff = void 0;
const https_1 = require("firebase-functions/v2/https");
const firestore_1 = require("firebase-functions/v2/firestore");
const utils_1 = require("../utils/utils");
const config_1 = require("../config/config");
exports.creatNewUSerStaff = (0, https_1.onCall)(async (request) => {
    const data = request.data;
    const { email } = data;
    const password = (0, utils_1.generateRandomPassword)();
    try {
        const responseCreateUser = await config_1.admin.auth().createUser({ email, password });
        const { uid } = responseCreateUser;
        const userDocRef = config_1.admin.firestore().collection('staff').doc(uid);
        await userDocRef.set(Object.assign(Object.assign({}, data), { createdAt: config_1.admin.firestore.FieldValue.serverTimestamp() }));
        return { success: true, uid };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
exports.deleteUserStaff = (0, firestore_1.onDocumentDeleted)("staff/{userId}", async (event) => {
    try {
        const userId = event.params.userId;
        await config_1.admin.auth().deleteUser(userId);
    }
    catch (error) {
        console.error(error);
    }
});
//# sourceMappingURL=users.js.map