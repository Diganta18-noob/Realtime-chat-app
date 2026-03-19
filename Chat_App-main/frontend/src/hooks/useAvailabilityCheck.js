import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useAvailabilityCheck = (value, endpoint) => {
  const [status, setStatus] = useState("idle"); // 'idle' | 'checking' | 'available' | 'taken' | 'error'
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Basic validation to avoid unnecessary checks
    if (!value || value.trim().length < 3) {
      setStatus("idle");
      setMessage("");
      return;
    }

    console.log(`[useAvailabilityCheck] Checking availability for ${value} at ${endpoint}...`);
    setStatus("checking");
    setMessage("Checking...");

    const timer = setTimeout(async () => {
      try {
        const url = `${endpoint}/${encodeURIComponent(value.trim())}`;
        console.log(`[useAvailabilityCheck] Firing Axios GET to: ${url}`);
        
        const res = await axiosInstance.get(url);
        console.log(`[useAvailabilityCheck] Received Data:`, res.data);
        
        const data = res.data;
        if (data.available) {
          console.log(`[useAvailabilityCheck] Username is Available.`);
          setStatus("available");
          setMessage("Available");
        } else {
          console.log(`[useAvailabilityCheck] Username is TAKEN.`);
          setStatus("taken");
          setMessage("Already taken");
        }
      } catch (error) {
        console.error(`[useAvailabilityCheck] Network Error:`, error);
        setStatus("error");
        setMessage("Could not verify, please try again");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, endpoint]);

  return { status, message };
};

export default useAvailabilityCheck;
