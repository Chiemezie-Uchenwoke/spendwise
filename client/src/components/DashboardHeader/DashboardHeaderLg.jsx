import { useEffect, useState } from "react";
import spendwiseLogo from "../../assets/spendwise.png";
import { useAuth } from "../../hooks/useAuth";

const DashboardHeaderLg = () => {

    const [userImage, setUserImage] = useState(null);
    const {user} = useAuth();

    const fetchUserImage = async () => {
        try {
            const url = "http://localhost:3000/profile/me";
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (!data.success){
                console.warn("Could not fetch profile image:", data.message);
                return;
            } else {
                setUserImage(data.imageUrl);
                console.log(data.imageUrl)
            }
        } catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUserImage();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <header className="border-b h-[4rem] border-black/20 hidden min-[1000px]:flex items-center">
            <div className="container flex items-center justify-between">
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