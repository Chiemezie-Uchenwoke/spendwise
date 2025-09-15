import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import { useToggle } from "../../hooks/useToggle";

const DashboardHeaderSm = () => {
    const {user, profileImage} = useAuth();
    const {setIsSidebarOpen} = useToggle();

    const handleToggle = () => {
        setIsSidebarOpen((prev) => !prev);
    }
    

    return (
        <header 
            className="w-full h-[3.8rem] px-4 min-[1000px]:hidden flex justify-between items-center border-b border-black/20 sticky top-0 bg-white/70"
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
                    profileImage ? 
                    <img 
                        src={profileImage} 
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