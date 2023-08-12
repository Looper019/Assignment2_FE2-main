import { useLocalStorage } from "@/hook";
import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };
  const cartItems = useAppSelector((state) => state.cart.items);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [user, setUser] = useLocalStorage('user', null)
  useEffect(() => {
    // Tính tổng số lượng sản phẩm trong giỏ hàng từ danh sách cartItems
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalItems);

    // Tính tổng số tiền trong giỏ hàng từ danh sách cartItems
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setCartTotalAmount(totalAmount);
  }, [cartItems]);
  const handleLogout = () => {
    // Xử lý logic đăng xuất ở đây

    // Sau khi đăng xuất, xóa thông tin người dùng từ Local Storage
    setUser(null);
    window.location.reload();
  };
  return (
//     <div>
//       <header className="bg-white">
//         {/* {user && user.firstName && user.lastName && (
//           <div className="ml-2 lg:ml-4 relative pl-[80px] mt-2 inline-block">
//             <span className="text-gray-500 text-lg">Chào mừng, {user.firstName} {user.lastName}!</span>
//           </div>
//         )} */}
//         <div className="container mx-auto px-4 py-5 flex items-center">
//           {/* Logo */}
//           <div className="mr-auto md:w-48 flex-shrink-0">
//             <img className="h-8 md:h-10" src="https://i.ibb.co/98pHdFq/2021-10-27-15h51-15.png" alt="" />
//           </div>

//           {/* Search */}
//           <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
//             <select className="bg-transparent uppercase font-bold text-sm p-4 mr-4" name="" id="">
//               <option>all categories</option>
//             </select>
//             <input className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4" type="text" placeholder="I'm searching for ..." />
//             <svg className="ml-auto h-5 px-4 text-gray-500 svg-inline--fa fa-search fa-w-16 fa-9x" aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
//               <path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path>
//             </svg>
//           </div>

//           {/* Phone number */}

//           <div className="ml-auto md:w-48 hidden pr-8 sm:flex flex-col place-items-end">
//   <div className="bg-blue-500 px-4 py-2 rounded-md">
//     <span className="text-white font-bold md:text-xl">Hỗ trợ 24/7</span>
//   </div>
//   <span className="mt-2 text-sm text-gray-400">Hotline: 0356 277 440</span>
// </div>
//           {!user && (
//             <div className="pr-2">
//               <svg className="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-user fa-w-14 fa-9x" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" >
//                 <path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
//               </svg>
//             </div>
//           )}
//           {/* Buttons */}
//           <nav className="flex items-center space-x-4">
//             {user ? (
//               <div className="relative flex items-center space-x-2">
//                 <div className="w-12 h-12 rounded-full overflow-hidden">
//                   <Link to={`/users/${user.id}`}>
//                   <img
//                     className="w-full h-full object-cover transform hover:scale-110 transition duration-400 cursor-pointer"
//                     src={user.userimage}
//                     alt="Avatar"
//                   />
//                   </Link>
//                 </div>
//                 <div className="hidden md:block">
//                   <p className="text-lg text-gray-800 font-semibold">{truncateName(user.lastName, 10)}</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link
//                   to="/signin"
//                   className="text-emerald-600 font-bold border border-emerald-600 hover:bg-emerald-600 hover:text-white px-[10px] py-1 rounded-md transition duration-300"
//                 >
//                   Đăng nhập
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="text-indigo-600 font-bold border border-indigo-600 hover:bg-indigo-600 hover:text-white px-[17px] py-1 rounded-md transition duration-300"
//                 >
//                   Đăng ký
//                 </Link>
//               </div>
//             )}

//             {user && (
//               <button
//                 className="ml-4 text-indigo-600 font-bold hover:text-indigo-800 transition duration-300"
//                 onClick={handleLogout}
//               >
//                 Đăng xuất
//               </button>
//             )}
//           </nav>

//           {/* Hiển thị số lượng sản phẩm và số tiền trong giỏ hàng */}
//           <li className="ml-2 lg:ml-4 relative inline-block">
//             <Link to="cart">
//               <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
//                 {cartItemCount > 0 && <div className="cart-count">{cartItemCount}</div>}
//               </div>
//               <svg className="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-shopping-cart fa-w-18 fa-9x" aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" >
//                 <path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path>
//               </svg>

//             </Link>
//           </li>
//           <div className="ml-4 hidden sm:flex flex-col font-bold">

//             <span className="text-xs text-gray-400">Tổng</span>
//             <span>${cartTotalAmount.toFixed(2)}</span>
//           </div>
//         </div>
//         <hr />
//       </header>
//     </div>
<div>
       <header className="bg-white">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="md:flex md:items-center md:gap-12">
          <a className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <svg
              className="h-8"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

<div className="relative">
  <label htmlFor="Search" className="sr-only"> Search </label>

  <input
    type="text"
    id="Search"
    placeholder="Search for..."
    className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
  />

  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
    <button type="button" className="text-gray-600 hover:text-gray-700">
      <span className="sr-only">Search</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </span>
</div>
        <div className="hidden md:block">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  About
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Careers
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  History
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Services
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Projects
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Blog
                </a>
              </li>
              
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
        <li className="ml-2 lg:ml-4 relative inline-block">
                <Link to="cart">
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {cartItemCount > 0 && <div className="cart-count">{cartItemCount}</div>}
                  </div>
                  <svg className="h-9 lg:h-10 p-2 text-gray-500 svg-inline--fa fa-shopping-cart fa-w-18 fa-9x" aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" >
                    <path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path>
                  </svg>
                </Link>
          </li>
          <div className="sm:flex sm:gap-4">
            <a
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
              href="/signin"
            >
              Login
            </a>
  
            <div className="hidden sm:flex">
              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                href="/signup"
              >
                Register
              </a>
            </div>
          </div>
            
          <div className="block md:hidden">
            <button
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
       
        </div>
      </div>
    </div>
  </header>
    </div>
  );
};

export default Header;
