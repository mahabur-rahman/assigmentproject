import ProfileLists from "../pages/ProfileLists/ProfileLists";
import ProfileEdit from "../pages/ProfileEdit/ProfileEdit";
import ProfileView from "../pages/ProfileView/ProfileView";
const router = [
  { path: "/", component: ProfileLists, exact: true },
  { path: "/profileedit/:id", component: ProfileEdit },
  { path: "/profileview/:id", component: ProfileView },
];
export default router;
