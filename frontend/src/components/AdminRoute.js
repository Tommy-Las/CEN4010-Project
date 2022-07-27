import { useUserContext } from "../context/userContext"
import NotFound from "./NotFound";

export default function AdminRoute({children}) {
    const { user, admin} = useUserContext();

    return ((user && admin) ? children : <NotFound />);
}