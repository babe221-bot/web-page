"use client"
import { requestForToken } from "@/lib/firebase";
import { useEffect } from "react";

const NotificationButton = () => {
  useEffect(() => {
    requestForToken();
  }, []);

  return (
    <button
      onClick={() => requestForToken()}
      className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Get Notifications
    </button>
  );
};

export default NotificationButton;
