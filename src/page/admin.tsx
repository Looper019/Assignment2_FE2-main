import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "@/actions/product";
import { IProduct } from "@/interfaces/product";
import { useLocalStorage } from "@/hook";

const Admin = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.product);
  const [user, setUser] = useLocalStorage('user', null)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Hàm chia mảng sản phẩm thành các trang (mỗi trang 4 sản phẩm)
  const chunkArray = (array: any, chunkSize: any) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Chia danh sách sản phẩm thành các trang (mỗi trang 4 sản phẩm)
  const productsPerPage = 4;
  const paginatedProducts = chunkArray(products, productsPerPage);

  // Lấy trang hiện tại từ query string (nếu không có, mặc định là trang đầu tiên)
  const currentPage = new URLSearchParams(window.location.search).get("page");
  const currentPageIndex = currentPage ? parseInt(currentPage, 10) - 1 : 0;
  const currentProducts = paginatedProducts[currentPageIndex] || [];
  const totalPages = paginatedProducts.length;
  const handleDeleteProduct = async (id: any) => {
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?");
    if (confirmDelete) {
      try {
        // Gọi action deleteProduct và truyền vào productId để xóa sản phẩm
        await dispatch(deleteProduct(id));
        // Nếu không có lỗi xảy ra, Redux store đã được cập nhật và sản phẩm đã được xóa thành công
        // Cập nhật lại state trong component (nếu cần thiết) không bắt buộc vì Redux store đã được cập nhật
      } catch (error) {
        // Xử lý lỗi nếu có
        console.log("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };
  return (
    
    <body className="font-poppins grid grid-cols-2 antialiased">
      <div
        id="view"
        className="h-full w-screen flex flex-row"
        x-data="{ sidenav: true }"
      >

        <button
          className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
        >
          <svg
            className="w-5 h-5 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          id="sidebar"
          className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
          x-show="sidenav"
        >
          <div className="space-y-6 md:space-y-10 mt-10">
            <h1 className="font-bold text-4xl text-center md:hidden">
              D<span className="text-teal-600">.</span>
            </h1>
            <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
              Dashwind<span className="text-teal-600">.</span>
            </h1>
            <div id="profile" className="space-y-3">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="Avatar user"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2
                  className="font-medium text-xs md:text-sm text-center text-teal-500"
                >
                  Eduard Pantazi
                </h2>
                <p className="text-xs text-gray-500 text-center">Administrator</p>
              </div>
            </div>
            <div
              className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500"
            >
              <input
                type="text"
                className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
                placeholder="Search"
              />
              <button
                className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div id="menu" className="flex flex-col space-y-2">
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
                <span className="">Dashboard</span>
              </a>
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                  ></path>
                </svg>
                <span className="">Products</span>
              </a>
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="">Reports</span>
              </a>
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                  ></path>
                  <path
                    d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                  ></path>
                </svg>
                <span className="">Messages</span>
              </a>
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="">Calendar</span>
              </a>
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="">Table</span>
              </a>
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
                  ></path>
                </svg>
                <span className="">UI Components</span>
              </a>
              <a
                href=""
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  ></path>
                </svg>
                <span className="">Users</span>
              </a>
            </div>
          </div>
        </div>

      </div>
      <div>
      <div>
      <span className="text-[#5A6169] text-[16px] py-4">
                   Danh mục sản phẩm
      </span>
      </div>
      <Link
      className="group ml-[595px]  gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
      to={`product/add`}
    >
      <span
        className="font-medium  text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
      >
        Thêm sản phẩm
      </span>
      </Link>
        <table className="-ml-[515px] mt-10 leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Giá gốc
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Thành tiền
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Giảm
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Loại
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                miêu tả
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>                   </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product: IProduct, index: any) => {
              
              const productIndex =
                currentPageIndex * productsPerPage + index + 1; 
              const maxProductNameLength = 20; 
              const maxProductDescriptionLength = 50; 

              // Hàm để cắt và hiển thị dấu "..." nếu tên sản phẩm quá dài
              const truncateProductName = (name: string) => {
                if (name.length > maxProductNameLength) {
                  return (
                    name.substring(0, maxProductNameLength) + "..."
                  );
                }
                return name;
              };

              // Hàm để cắt và hiển thị dấu "..." nếu mô tả sản phẩm quá dài
              const truncateProductDescription = (
                description: string
              ) => {
                if (
                  description.length > maxProductDescriptionLength
                ) {
                  return (
                    description.substring(
                      0,
                      maxProductDescriptionLength
                    ) + "..."
                  );
                }
                return description;
              };

              return (
                <tr key={product.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {productIndex}
                  </td>{" "}
                  {/* Hiển thị số thứ tự */}
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Link to={`product/update/${product.id}`}>
                      {truncateProductName(product.name)}{" "}
                      {/* Sử dụng hàm cắt tên sản phẩm */}
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {product.price}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {product.originalPrice}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {product.discount}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {product.category}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {truncateProductDescription(product.description)}{" "}
                  
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img
                      className="w-[100px]  rounded-lg"
                      src={product.image}
                      alt=""
                    />
                  </td>
                  <td className="whitespace-nowrap text-gray-700 px-5 py-5 border-b border-gray-200 bg-white text-sm">

                    <Link to={`product/update/${product.id}`}>
                      <button className="bg-blue-600 mr-1 text-white rounded-md p-2">
                        Sửa
                      </button>
                    </Link>
                    <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 ml-1 text-white rounded-md p-2">
                      Xoá
                    </button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </body>
  );
};

export default Admin;