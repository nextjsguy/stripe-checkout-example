import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAppContext } from "../context/CartContext";

const Header = () => {
  const router = useRouter();
  const [displayCheckout, setDisplayCheckout] = useState(false);
  const modalRef = useRef();
  const { state, dispatch } = useAppContext();

  console.log("state.products", state.products);

  async function checkout() {
    const lineItems = Object.keys(state.products).map((id) => {
      console.log(state.products[id]);

      return {
        price: id,
        quantity: state.products[id].qty,
      };
    });

    // const lineItems = products.map((product) => {
    //   return {
    //     price: product.id,
    //     quantity: 1,
    //   };
    // });

    const res = await fetch("api/checkout", {
      method: "POST",
      body: JSON.stringify({ lineItems }),
    });

    const data = await res.json();
    router.push(data.session.url);
  }

  function increment(id, size, count) {
    return () =>
      dispatch({
        type: "vary_count",
        value: [id, size, count + 1],
      });
  }

  function decrement(id, size, count) {
    if (count - 1 > 0) {
      return () =>
        dispatch({
          type: "vary_count",
          value: [id, size, count - 1],
        });
    }
    return () =>
      dispatch({
        type: "remove_product",
        value: [id, size],
      });
  }

  return (
    <nav className="flex items-center justify-between px-4 shadow-lg sticky top-0 z-50 bg-white ">
      {displayCheckout && (
        <div
          ref={modalRef}
          className="absolute bg-white shadow border border-gray-200 border-solid z-50 top-0 h-screen w-screen sm:w-80 right-0 flex flex-col gap-2 px-2"
        >
          <div className="overflow-auto flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl py-4">CART</h1>
              <div
                className="ml-auto w-fit p-2 cursor-pointer select-none transition duration-300 opacity-50"
                onClick={() => setDisplayCheckout(false)}
              >
                ╳
              </div>
            </div>
            <hr className="py-2" />
            {Object.keys(state.products).map((productId, index) => {
              const prod = state.products[productId];
              const product = state.prices.find((val) => val.id === productId);
              return (
                <div key={index} className="flex flex-col gap-4">
                  {Object.keys(prod).map((size) => {
                    const number = prod[size];
                    return (
                      <div
                        key={size}
                        className="border-l border-solid border-gray-100 text-xs  p-2 flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="truncate">{product.product.name}</p>
                          <p>${product.unit_amount / 100}</p>
                        </div>
                        <div className="font-extralight flex justify-between items-center">
                          <h1>SIZE: {size}</h1>
                          <div>
                            <h1>
                              QUANTITY:{" "}
                              <span className="pl-4 border border-solid py-1 pr-6 border-gray-400 ml-3 relative">
                                {number}
                                <div className="absolute top-0 right-0 h-full w-3 flex flex-col ">
                                  <div
                                    className="leading-none scale-75 cursor-pointer"
                                    onClick={increment(productId, size, number)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="leading-none scale-75 cursor-pointer"
                                    onClick={decrement(productId, size, number)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <button
            onClick={checkout}
            className=" m-1 shadow bg-black text-white font-light text-sm py-2 transition duration-300 hover:opacity-50 select-none"
          >
            CHECKOUT
          </button>
        </div>
      )}
      <h1
        onClick={() => router.push("/")}
        className={
          "px-4 py-6 sm:py-14 pl-14 font-normal select-none sm:text-4xl cursor-pointer transition hover:opacity-80 " +
          ``
        }
      >
        John's Shop
      </h1>
      <div
        className="relative cursor-pointer grid place-items-center"
        onClick={() => setDisplayCheckout(!displayCheckout)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 px-2 py-2 text-xl sm:text-3xl mr-4 transition hover:opacity-60 duration-300"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
            clipRule="evenodd"
          />
        </svg>
        {Object.keys(state.products).length > 0 && (
          <div className="absolute inset-0 mx-auto top-1.5 h-2 w-2 rounded-full bg-rose-400 z-20" />
        )}
      </div>
    </nav>

    // <div className="sticky top-0 bg-white shadow-lg py-8 flex justify-between items-center px-4">
    //   <h1
    //     onClick={() => router.push("/")}
    //     className="cursor-pointer select-none transition hover:opacity-50 duration-30 "
    //   >
    //     John's Shop
    //   </h1>

    //   <div className="cursor-pointer">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   </div>
    // </div>
  );
};

export default Header;
