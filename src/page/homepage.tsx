import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getProducts } from '@/actions/product';
import Slider from '@/components/layout/slider';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Dresses from '@/components/layout/Dresses';

const truncateDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};
const truncateName = (name: string, maxLength: number) => {
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...';
  }
  return name;
};

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state: any) => state.product);

  const [currentPage, setCurrentPage] = useState(0); // Đổi giá trị ban đầu của currentPage thành 0
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage); // Cập nhật currentPage với trang mới
  };

  const renderProducts = () => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return currentProducts.map((product: any) => (
      <Link to={`/products/${product.id}`} key={product.id} className="m-2">
           <div className='flex items-center justify-center min-h-screen from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3]  bg-gradient-to-br px-2'>
          <div className='w-full max-w-md  mx-auto  bg-white rounded-3xl shadow-xl overflow-hidden'>
            <div className='max-w-md mx-auto'>
             <img className='' src={product.image} alt="" />
              <div className='p-4 sm:p-6'>
                <p className='font-bold text-gray-700 text-[20px] leading-7 mb-1'>{product.name}</p>
                <div className='flex flex-row'>
                  <p className='text-[#3C3C4399] text-[17px] mr-2 line-through'>{product.originalPrice}đ</p>
                  <p className='text-[17px] font-bold  text-[#ff3434]'>{product.price}đ</p>
                  <p className="ml-auto text-base font-medium text-green-500">
                  {product.discount}% off
                </p>
                </div>
                <p className='text-[#7C7C80] font-[15px] mt-6'>{product.description}</p>


                <a target='_blank' href='foodiesapp://food/1001' className='block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                  View on foodies
                </a>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  const pageCount = Math.ceil(products.length / productsPerPage);

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className="bg-indigo-50">
      <Slider />
      <Dresses/>
      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 py-10 flex flex-wrap justify-center">
          {renderProducts()}
        </div>
      </section>
      {/* Phân trang */}
      <div className="flex justify-center items-center pb-6">
        <ReactPaginate
          previousLabel={<i className="fas fa-angle-left">Trước</i>}
          nextLabel={<i className="fas fa-angle-right">Tiếp</i>}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => handlePageChange(selected)}
          containerClassName={'pagination flex items-center'}
          pageClassName={
            'mx-1 px-3 py-2 rounded-md bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white'
          }
          previousClassName={
            'mx-1 px-3 py-2 rounded-md bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white'
          }
          nextClassName={
            'mx-1 px-3 py-2 rounded-md bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white'
          }
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default HomePage;