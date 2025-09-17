import { useEffect, useState } from "react";

export function usePaystackScript() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // If script already exists, just mark as loaded
        if (document.getElementById("paystack-script")) {
            setLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.id = "paystack-script";
        script.async = true;

        script.onload = () => setLoaded(true);
        script.onerror = () => setLoaded(false);

        document.body.appendChild(script);

    }, []);

    return loaded;
}
