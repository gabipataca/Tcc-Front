import { useProfileMenuContext } from "../contexts/ProfileMenuContext";



const useProfileMenu = () => {
    const { activeMenu, toggleMenu } = useProfileMenuContext();

    return {
        activeMenu,
        toggleMenu,
    }
}

export default useProfileMenu;