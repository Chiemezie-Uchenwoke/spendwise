import { useEffect } from "react";

const Notification = ({message, type, onClose}) => {

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
        }, 3000);

        return () => clearTimeout(timer);
        
        }
    }, [message, onClose]);

    if (!message) return null;


    const styles = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
    }

    return (
        <div className={`w-fit max-w-60 px-4 py-2 fixed bottom-10 right-5 z-30 rounded-md shadow-md transition-opacity ${styles[type]}`}>
            <p className="text-sm">{message}</p>
        </div>
    )
}

export default Notification;