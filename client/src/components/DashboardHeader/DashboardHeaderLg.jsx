import { useEffect, useState } from "react";
import spendwiseLogo from "../../assets/spendwise.png";
import { useAuth } from "../../hooks/useAuth";

const DashboardHeaderLg = () => {

    const [userImage, setUserImage] = useState(null);
    const {user, fetchProfileImage} = useAuth();

    

    useEffect(() => {

        const fetchUserImage = async () => {
            const imageUrl = await fetchProfileImage();
            
            setUserImage(imageUrl);
        };

        if (user) fetchUserImage();

    }, [user, fetchProfileImage]);

    return (
        <header className="border-b h-[4rem] border-black/20 bg-white-col hidden min-[1000px]:flex items-center sticky top-0 z-50">
            <div className="w-full px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img 
                        src={spendwiseLogo} 
                        alt="Spendwise Logo" 
                        className="w-[2.5rem] h-auto"
                    />

                    <h1 className="font-bold">SpendWise</h1>
                </div>

                <div className="flex items-center gap-4">
                    <p className="capitalize font-medium">dashboard</p>

                    <div className="w-10 h-10 border border-black/30 rounded-[50%] overflow-hidden bg-pri-col/50 flex items-center justify-center">
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
                </div>
            </div>
        </header>
    )
}

export default DashboardHeaderLg;