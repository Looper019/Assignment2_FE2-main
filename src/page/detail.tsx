import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getProductById, getProducts } from "@/actions/product";
import { add } from "@/slices/cart";
import { IProduct } from "@/interfaces/product";
import {
  addCommentToProduct,
  fetchCommentsByProductId,
} from "@/actions/comment";
import { useSelector } from "react-redux";
import { useLocalStorage } from "@/hook";

const ProductDetailPage = () => {
  const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };
  // const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [user] = useLocalStorage("user", null);

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  //// comment


  const [isCommentValid, setIsCommentValid] = useState(false);
  const [showCommentValidation, setShowCommentValidation] = useState(false);
  /// size
  const [selectedSize, setSelectedSize] = useState<string>(""); // Giá trị mặc định ban đầu cho kích cỡ

  // const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedSize(event.target.value);
  // };

  const id = Number(useParams<{ id: string }>().id);
  const comments = useSelector(
    (state: any) => state.comment.commentsByProduct[id]
  );
  // const commentStatus = useSelector((state: any) => state.comment.status);
  const error = useSelector((state: any) => state.comment.error);


  /// phan trang comment


  /// quantity
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);
  const [sizeQuantities, setSizeQuantities] = useState<
    { size: string; quantity: number }[]
  >([]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSizeValue = event.target.value;
    setSelectedSize(selectedSizeValue);

    // Tạo một bản sao của mảng selectedProduct.sizes
    const updatedSizes = selectedProduct?.sizes.slice();

    // Tìm số lượng tương ứng với size đã chọn
    const selectedSizeQuantity = updatedSizes.find(
      (size: any) => size.size === selectedSizeValue
    )?.quantity || 0;

    setSelectedProductQuantity(1); // Mỗi khi kích cỡ thay đổi, reset số lượng sản phẩm đã chọn về 1
    setSizeQuantities(updatedSizes); // Cập nhật danh sách size và số lượng tương ứng
  };


  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProductQuantity(Number(event.target.value));
  };

  const getProductQuantityOptions = () => {
    const maxQuantity =
      selectedProduct?.sizes?.find((size: any) => size.size === selectedSize)
        ?.quantity || 0;

    return Array.from({ length: maxQuantity }, (_, index) => index + 1);
  };
  /// quantity
  /// quantity
  const lastName = user?.lastName;
  const userimage = user?.userimage;

  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = (comment: string) => {
    if (user) {
      if (comment.trim() !== "") {
        const currentDateTime = getCurrentDateTime();
        // Lấy tên người dùng từ localStorage nếu đã đăng nhập
        dispatch(addCommentToProduct({ id, comment, lastName, userimage, timestamp: currentDateTime, }));
        setIsCommentValid(true);
        setCommentInput('');
      } else {
        // Đặt trạng thái validate về true để hiển thị thông báo lỗi
        setIsCommentValid(false);
      }
      // Đặt biến state showCommentValidation về true để hiển thị trạng thái validate khi người dùng click vào nút "Gửi"
      setShowCommentValidation(true);
    } else {
      // Đặt biến state showCommentValidation về true để hiển thị trạng thái validate khi người dùng click vào nút "Gửi"
      setShowCommentValidation(true);
    }
  };
  const ITEMS_PER_PAGE = 4; // Số lượng bình luận hiển thị trên mỗi trang

  const sortedComments = comments?.slice().sort((a: any, b: any) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateA - dateB;
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // Lấy giá trị currentPage từ localStorage nếu có
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    // Lưu giá trị currentPage vào localStorage mỗi khi currentPage thay đổi
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const totalComments = sortedComments?.length || 0;
  const totalPages = Math.ceil(totalComments / ITEMS_PER_PAGE);
  const indexOfLastComment = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstComment = indexOfLastComment - ITEMS_PER_PAGE;
  const currentComments = sortedComments?.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  //// comment

  const getCurrentDateTime = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const currentDate = new Date();
    return currentDate.toLocaleDateString('vi-VN', options);
  };
  const { selectedProduct, isLoading } = useAppSelector(
    (state: any) => state.product
  );
  const allProducts = useAppSelector((state: any) => state.product.products);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(Number(id)));
      dispatch(getProducts()); // Gọi action để lấy danh sách sản phẩm
      dispatch(fetchCommentsByProductId(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedProduct && selectedSize) {
      const productToAdd = {
        ...selectedProduct,
        size: selectedSize,
        quantity: selectedQuantity,
      };
      dispatch(add(productToAdd));
      alert("Đã thêm sản phẩm vào giỏ hàng.");
    } else {
      // Hiển thị thông báo lỗi nếu người dùng chưa chọn kích cỡ
      alert("Vui lòng chọn kích cỡ sản phẩm trước khi thêm vào giỏ hàng.");

    }
  };
  useEffect(() => {
    if (selectedProduct && allProducts) {
      // Lọc danh sách các sản phẩm liên quan dựa vào category của sản phẩm hiện tại
      const relatedProducts = allProducts.filter(
        (product: any) => product.category === selectedProduct.category
      );

      // Loại bỏ sản phẩm hiện tại khỏi danh sách liên quan
      const filteredRelatedProducts = relatedProducts.filter(
        (product: any) => product.id !== selectedProduct.id
      );

      // Giới hạn số lượng sản phẩm liên quan hiển thị, chẳng hạn 4 sản phẩm
      const limitRelatedProducts = filteredRelatedProducts.slice(0, 4);

      setRelatedProducts(limitRelatedProducts);
    }
  }, [selectedProduct, allProducts]);

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  if (!selectedProduct) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div className="bg-indigo-50 py-2">
      <header>{/* Your header code here */}</header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Your breadcrumbs code here */}
      </div>
      <div>
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={selectedProduct.image} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{selectedProduct.name}</h1>

                <div className="flex mb-4">
                  <span className="flex items-center">

                    <span className="text-gray-600 ml-3">Loại: <span className="text-blue-600">{selectedProduct.category}</span></span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{selectedProduct.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex items-center space-x-4 my-4">
                    <div className="">
                      <div className="rounded-lg flex items-center py-2 px-3">
                        <p className='text-[#3C3C4399] text-[17px] mr-5 line-through'>{selectedProduct.originalPrice}đ</p>
                        <p className='text-[27px] font-bold  text-[#ff3434]'>{selectedProduct.price}đ</p>
                      </div>
                    </div>
                    {selectedProduct.discount && (
                      <div className="flex-1">
                        <p className="text-green-500 text-xl font-semibold">
                          Giảm {selectedProduct.discount}%
                        </p>
                        <p className="text-gray-400 text-sm">
                          Bao gồm tất cả các loại thuế.
                        </p>
                      </div>
                    )}
                  </div>



                </div>
                <div className="flex">

                  <div className="flex  items-center">
                    <div className="relative flex-1 mr-3">
                      <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                        Số lượng
                      </div>
                      <select
                        className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-7 pr-11 h-14 flex items-end pb-1 w-full"
                        value={selectedProductQuantity}
                        onChange={handleQuantityChange}
                      >
                        <option value="size">Chọn số lượng</option>
                        {selectedProduct &&
                          Array.isArray(getProductQuantityOptions()) &&
                          getProductQuantityOptions().map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                      </select>

                      <svg
                        className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                    <div className="relative flex-1">
                      <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                        Kích cỡ
                      </div>
                      <select
                        className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-7 pr-11 h-14 flex items-end pb-1 w-full"
                        value={selectedSize}
                        onChange={handleSizeChange}
                      >
                        <option value="size">Chọn kích cỡ</option>
                        {selectedProduct &&
                          selectedProduct.sizes &&
                          Array.isArray(selectedProduct.sizes) &&
                          selectedProduct.sizes.map((sizeOption: any) => (
                            <option key={sizeOption.size} value={sizeOption.size}>
                              {sizeOption.size}
                            </option>
                          ))}
                      </select>

                      <svg
                        className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                  </div>
                  <button onClick={handleAddToCart} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Thêm vào giỏ hàng</button>

                </div>
              </div>
            </div>
            <div className=" max-w-7xl mx-auto bg-transparent mt-8 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4">Bình luận</h2>


              {/* Hiển thị danh sách bình luận */}
              {Array.isArray(currentComments) && currentComments.length > 0 ? (
                currentComments.map((comment, index) => (
                  <div key={index} className="flex pt-7  relative top-1/3">

                    <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                      <div className="relative flex gap-4">
                        <img src={comment.image} className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
                        <div className="flex flex-col w-full">
                          <div className="flex flex-row justify-between">
                            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{comment.username}</p>
                            <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                          </div>
                          <p className="text-gray-400 text-sm">{comment.date}</p>
                        </div>
                      </div>
                      <p className="  text-gray-500">{comment.content}</p>
                    </div>



                  </div>
                ))
              ) : (
                <p className="text-gray-500">Không có bình luận.</p>
              )}
              <div className="flex items-center justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`mx-1 px-3 py-1 rounded-lg ${currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              {/* Form bình luận */}
              {user && (
                <form onSubmit={(e) => { e.preventDefault(); handleAddComment(commentInput) }} className="mt-4 flex items-center border border-gray-300 rounded-lg">
                  <input
                    type="text"
                    name="comment"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Nhập bình luận..."
                    className="w-full p-3 focus:outline-none"
                  />
                  <button type="submit" className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none transition-colors">
                    Gửi
                  </button>
                </form>
              )}

              {/* Hiển thị thông báo yêu cầu đăng nhập nếu chưa đăng nhập */}
              {!user ? (
                <div className="mt-4 bg-red-100 p-4 rounded-lg mb-4">
                  <span className="text-red-700">
                    Bạn cần <Link to="/signin" className="text-indigo-600 hover:underline">Đăng nhập</Link> để sử dụng chức năng bình luận
                  </span>
                </div>
              ) : (
                <div className="mt-3">
                  {isCommentValid && showCommentValidation && (
                    <div className="bg-green-100 p-4 rounded-lg mb-4">
                      <p className="text-green-700">Bình luận đã được đăng thành công.</p>
                    </div>
                  )}
                  {isCommentValid === false && showCommentValidation && (
                    <div className="bg-red-100 p-4 rounded-lg mb-4">
                      <p className="text-red-700">Vui lòng nhập nội dung bình luận.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex mr-10">
            {relatedProducts.map((product) => (
              <div key={product.id}
                className="bg-white mr-10 mt-10 rounded-lg shadow-md p-4 transition duration-300 transform hover:scale-105">
               <Link to={`/products/${product.id}`}>
               <div className=" mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                  <img className="h-48 w-full object-cover object-center" src={product.image} alt="Product Image" />
                  <div className="p-4">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{product.name}</h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{product.description}</p>
                    <div className="flex items-center">
                      <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{product.price}</p>
                      <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">{product.originalPrice}</p>
                      <p className="ml-auto text-base font-medium text-green-500">{product.discount}%</p>
                    </div>
                  </div>
                </div>
               </Link>
              </div>
            ))}
            </div>
          </div>
        </section>
      </div>
    </div>

  );
};

export default ProductDetailPage;
