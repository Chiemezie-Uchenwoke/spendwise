import { useState, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import { useToggle } from "../../hooks/useToggle";

const DashboardHeaderSm = () => {
    const [userImage, setUserImage] = useState(null);
    const {user, fetchProfileImage} = useAuth();
    const {setIsSidebarOpen} = useToggle();

    useEffect(() => {
    
        const fetchUserImage = async () => {
            const imageUrl = await fetchProfileImage();
            
            setUserImage(imageUrl);
        };

        if (user) fetchUserImage();
    
    }, [user, fetchProfileImage]);

    const handleToggle = () => {
        setIsSidebarOpen((prev) => !prev);
    }
    

    return (
        <header 
            className="w-full h-[3.8rem] px-4 min-[1000px]:hidden flex justify-between items-center border-b border-black/20 sticky top-0"
        >
            <div className="h-full flex items-center gap-2">
                <button 
                    className="border border-black/30 py-1 px-1 rounded"
                    onClick={handleToggle}
                >
                    <HiOutlineMenu className="text-xl sm:text-2xl" />
                </button>

                <h1 className="text-sm font-bold">SpendWise</h1>
            </div>

            <div 
                className="w-8 h-8 border border-black/30 rounded-[50%] overflow-hidden bg-pri-col/50 flex items-center justify-center"
            >
                {
                    userImage ? 
                    <img 
                        src={userImage} 
                        alt="User image" 
                        className="w-full h-full object-cover"
                    /> 
                    : user?.username?.charAt(0).toUpperCase()
                }
            </div>
        </header>
    )
}

export default DashboardHeaderSm;