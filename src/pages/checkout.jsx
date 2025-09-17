



// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearCart } from "../features/ecommerceSlice";
// import { usePaystackScript } from "../redux/usePaystackScript";
// import toast from "react-hot-toast";
// import axios from "axios";

// const Checkout = () => {
//   const cart = useSelector((state) => state.ecommerce.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const paystackReady = usePaystackScript();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * (item.quantity || 1),
//     0
//   );

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });

//   };

//   const [emailError, setEmailError,] = useState("");
//   const [phoneError, setPhoneError] = useState("");


//   const handlePlaceOrder = (e) => {
//     e.preventDefault();

//     // ✅ Validate Phone
//     if (!/^[0-9]{10,11}$/.test(form.phone)) {
//       setPhoneError("Phone number must be 10 or 11 digits (e.g. 8012345678 or 08012345678)");
//       return;
//     } else {
//       setPhoneError("");
//     }

//     // ✅ Validate Gmail
//     if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
//       setEmailError("Only full Gmail addresses are allowed (e.g. name@gmail.com)");
//       return;
//     } else {
//       setEmailError("");
//     }

//     // ✅ Check Paystack is ready
//     if (!paystackReady || !window.PaystackPop) {
//       toast.error("Payment service not ready. Please wait...");
//       return;
//     }

//     const handler = window.PaystackPop.setup({
//       key: "pk_test_06954f90920eacd80e7908d6b67b1f1e186cbd17", // Replace with your test/live key
//       email: form.email,
//       amount: totalPrice * 100, // Paystack uses kobo
//       currency: "NGN",
//       ref: "" + Math.floor(Math.random() * 1000000000 + 1),
//       callback: (response) => {
//         // ✅ Minimized payload for backend
//         const orderData = {
//           customer: {
//             name: form.name,
//             email: form.email,
//             phone: form.phone,
//             address: form.address,
//           },
//           items: cart.map((item) => ({
//             id: item.id,
//             name: item.name,
//             qty: item.quantity || 1,
//             price: item.price,
//           })),
//           total: totalPrice,
//           date: new Date().toISOString(),
//           status: "paid",
//           reference: response.reference,
//         };

//         axios
//           .post("http://localhost:3000/orders", orderData)
//           .then(() => {
//             toast.success("Payment successful! Order placed.");
//             dispatch(clearCart());
//             navigate("/order-success");
//           })
//           .catch((error) => {
//             console.error("Error saving order:", error);
//             // ✅ Still redirect user so they don’t think payment failed
//             toast.error("Payment was successful, but order saving failed!");
//             navigate("/order-success");
//           });
//       },
//       onClose: () => {
//         toast.error("Payment window closed.");
//       },
//     });

//     handler.openIframe();
//   };

//   return (
//     <div className="p-8 bg-slate-100  text-white min-h-screen rounded-2xl">
//       {/* Back Button */}
//       <h1
//         onClick={() => navigate("/cart")}
//         className="inline-block px-4 py-2 mb-8 text-sm font-semibold text-white 
//           transition-all duration-200 bg-purple-600 rounded-lg shadow-lg cursor-pointer
//           hover:bg-purple-700 hover:shadow-purple-500/50"
//       >
//         Back
//       </h1>

//       {/* Page Title */}
//       <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-transparent
//        bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
//         Checkout
//       </h2>

//       <div className="grid  gap-10 md:grid-cols-2">
//         {/* Shipping Form */}
//         <form
//           onSubmit={handlePlaceOrder}
//           className="space-y-5 bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
//         >
//           <h3 className="mb-4 text-xl font-semibold text-pink-500">
//             Shipping Information
//           </h3>

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white border border-gray-200
//              text-black placeholder-gray-400 focus:outline-none focus:border-purple-500"
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={form.address}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white border border-gray-200
//              text-black placeholder-gray-400 focus:outline-none focus:border-purple-500"
//             required
//           />
//           <div>
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={(e) => {
//                 setForm({ ...form, phone: e.target.value });
//                 setPhoneError(""); // clear error while typing
//               }}
//               className={`w-full p-3 rounded-lg border bg-white text-black placeholder-gray-400 focus:outline-none 
//               ${phoneError ? "border-red-500 bg-red-900/40" : "border-gray-200 bg-white focus:border-purple-500"}`}
//               required
//             />

//             {phoneError && (
//               <p className="mt-2 text-sm text-red-400">{phoneError}</p>
//             )}
//           </div>
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={(e) => {
//                 setForm({ ...form, email: e.target.value });
//                 setEmailError(""); // clear error while typing
//               }}
//               className={`w-full p-3 rounded-lg border text-black placeholder-gray-400 focus:outline-none 
//               ${emailError ? "border-red-500 bg-red-900/40" : "border-gray-200 bg-white focus:border-purple-500"}`}
//               required
//             />

//             {emailError && (
//               <p className="mt-2 text-sm text-red-400">{emailError}</p>
//             )}
//           </div>


//           <button
//             type="submit"
//             disabled={!paystackReady}
//             className="w-full py-3 text-lg font-semibold text-white transition-all 
//               duration-200 rounded-lg shadow-lg bg-gradient-to-r
//               from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 
//               hover:shadow-pink-500/50 cursor-pointer disabled:opacity-50"
//           >
//             {paystackReady
//               ? `Pay ₦${totalPrice.toFixed(2)}`
//               : "Loading Paystack..."}
//           </button>
//         </form>

//         {/* Order Summary */}
//         <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-200 shadow-pink-100">
//           <h3 className="mb-6 text-2xl font-semibold text-pink-500">
//             Order Summary
//           </h3>

//           {/* Scrollable Table Wrapper */}
//           <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
//             {/* Table Header */}
//             <div className="grid grid-cols-[1fr_80px_100px] text-gray-600 font-semibold
//              bg-gray-100 border-b sticky top-0 z-10 px-2 py-2">
//               <span>Item</span>
//               <span className="text-center pl-10">Qty</span>
//               <span className="text-right">Price</span>
//             </div>

//             {/* Table Rows */}
//             {cart.map((item, index) => (
//               <div
//                 key={item.id}
//                 className={`grid grid-cols-[1fr_80px_100px] items-center 
//                    text-black text-md px-2 py-2 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   }`}
//               >
//                 {/* Item Name */}
//                 <span className="truncate">{item.name}</span>

//                 {/* Quantity */}
//                 <span className="text-center pl-10">{item.quantity || 1}</span>

//                 {/* Price */}
//                 <span className="text-right font-medium">
//                   ₦{(item.price * (item.quantity || 1)).toFixed(2)}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <hr className="my-4 border-black" />

//           {/* Total */}
//           <p className="text-xl font-bold text-black flex justify-between">
//             <span>Total:</span>
//             <span className="text-purple-500">₦{totalPrice.toFixed(2)}</span>
//           </p>
//         </div>


//       </div>
//     </div>
//   );
// };

// export default Checkout;




import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/ecommerceSlice";
import toast from "react-hot-toast";
import axios from "axios";

// ✅ Inline Paystack hook
function usePaystackScript() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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

const Checkout = () => {
  const cart = useSelector((state) => state.ecommerce.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paystackReady = usePaystackScript();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // ✅ Save order with status
  const saveOrder = async (status, reference) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:3000/orders", {
        customer: { ...form, name: user?.name || form.name, email: form.email },
        items: cart,
        total: totalPrice,
        date: new Date().toISOString(),
        status: status,
        reference: reference || "" + Math.floor(Math.random() * 1000000000 + 1),
      });

      if (status === "paid") {
        toast.success("Payment successful! Order placed.");
        dispatch(clearCart());
        navigate("/order-success");
      } else {
        toast.error("Order saved but payment failed.");
      }
    } catch (err) {
      console.error("Failed to save order:", err);
      toast.error("Error saving order. Try again.");
    }
  };

  // ✅ Paystack handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!/^[0-9]{10,11}$/.test(form.phone)) {
      setPhoneError("Phone number must be 10 or 11 digits");
      return;
    } else {
      setPhoneError("");
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      setEmailError("Only Gmail addresses allowed (example@gmail.com)");
      return;
    } else {
      setEmailError("");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("You must sign in to make payment");
      navigate("/signin", { state: { from: "/checkout" } });
      return;
    }

    if (!paystackReady || !window.PaystackPop) {
      toast.error("Payment service not ready. Please wait...");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_06954f90920eacd80e7908d6b67b1f1e186cbd17", // replace with your public key
      email: form.email,
      amount: Math.round(totalPrice * 100),
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),

      callback: (response) => {
        // Payment success
        saveOrder("paid", response.reference);
      },

      onClose: () => {
        // Payment failed or cancelled
        saveOrder("failed", null);
        toast.error("Payment was not completed.");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen rounded-2xl">
      <h1
        onClick={() => navigate("/cart")}
        className="inline-block px-4 py-2 mb-8 text-sm font-semibold text-white 
          transition-all duration-200 bg-purple-600 rounded-lg shadow-lg cursor-pointer
          hover:bg-purple-700 hover:shadow-purple-500/50"
      >
        Back
      </h1>

      <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-transparent
       bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
        Checkout
      </h2>

      <div className="grid gap-10 justify-center items-start md:grid-cols-2">
        {/* Shipping Form */}
        <form
          onSubmit={handlePlaceOrder}
          className="space-y-5 bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <h3 className="mb-4 text-xl font-semibold text-pink-500">
            Shipping Information
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white border border-gray-200 text-black"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white border border-gray-200 text-black"
            required
          />
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                setPhoneError("");
              }}
              className={`w-full p-3 rounded-lg border text-black 
                ${phoneError ? "border-red-500 bg-red-100" : "border-gray-200"}`}
              required
            />
            {phoneError && (
              <p className="mt-2 text-sm text-red-400">{phoneError}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setEmailError("");
              }}
              className={`w-full p-3 rounded-lg border text-black 
                ${emailError ? "border-red-500 bg-red-100" : "border-gray-200"}`}
              required
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-400">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!paystackReady}
            className="w-full py-3 text-lg font-semibold text-white transition-all 
              duration-200 rounded-lg shadow-lg bg-gradient-to-r
              from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 
              hover:shadow-pink-500/50 cursor-pointer disabled:opacity-50"
          >
            {paystackReady
              ? `Pay ₦${totalPrice.toFixed(2)}`
              : "Loading Paystack..."}
          </button>
        </form>

        {/* Order Summary */}
        <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-200 shadow-pink-100">
          <h3 className="mb-6 text-2xl font-semibold text-pink-500">
            Order Summary
          </h3>
          <div className="max-h-64 overflow-y-auto overflow-x-auto rounded-lg border border-gray-200">
            <div className="grid grid-cols-[1fr_80px_100px] text-gray-600 font-semibold
             bg-gray-100 border-b sticky top-0 z-10 px-2 py-2">
              <span>Item</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Price</span>
            </div>
            {cart.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-[1fr_80px_100px] items-center 
                   text-black text-md px-2 py-2 ${
                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
                   }`}
              >
                <span className="truncate">{item.name}</span>
                <span className="text-center">{item.quantity || 1}</span>
                <span className="text-right font-medium">
                  ₦{(item.price * (item.quantity || 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-4 border-black" />

          <p className="text-xl font-bold text-black flex justify-between">
            <span>Total:</span>
            <span className="text-purple-500">₦{totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
