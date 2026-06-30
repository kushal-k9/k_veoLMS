import { t as api } from "./client-BtKFGlsZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users.endpoints-Hq_02aTt.js
async function listUsers(params = {}) {
	const { data } = await api.get("/users", { params });
	return data.data.users;
}
async function setUserRole(id, role) {
	const { data } = await api.patch(`/users/${id}/role`, { role });
	return data.data.user;
}
async function setUserStatus(id, status) {
	const { data } = await api.patch(`/users/${id}/status`, { status });
	return data.data.user;
}
async function resetUserPassword(id) {
	const { data } = await api.post(`/users/${id}/reset-password`);
	return data.data.tempPassword;
}
async function getWishlist() {
	const { data } = await api.get("/users/me/wishlist");
	return data.data.courses;
}
async function addToWishlist(courseId) {
	const { data } = await api.post(`/users/me/wishlist/${courseId}`);
	return data.data.courses;
}
async function removeFromWishlist(courseId) {
	const { data } = await api.delete(`/users/me/wishlist/${courseId}`);
	return data.data.courses;
}
//#endregion
export { resetUserPassword as a, removeFromWishlist as i, getWishlist as n, setUserRole as o, listUsers as r, setUserStatus as s, addToWishlist as t };
