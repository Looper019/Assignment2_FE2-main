import { registerUser } from '@/actions/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state: any) => state.auth);
 const navigate = useNavigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    marketingAccept: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isValidEmail = (email: any) => {
    // Biểu thức chính quy kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của email trước khi đăng ký


    // Kiểm tra tính hợp lệ của mật khẩu trước khi đăng ký


    if (formData.firstName == "") {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Vui lòng nhập tên của bạn.');
      return;
    }
    if (formData.lastName == "") {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Vui lòng nhập Họ của bạn.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }
    if (formData.password.length < 6) {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (formData.password !== formData.passwordConfirmation) {
      // Hiển thị thông báo lỗi trong giao diện
      setErrorMessage('Xác nhận mật khẩu không chính xác.');
      return;
    }

    // Gửi thông tin đăng ký lên server nếu không có lỗi
    dispatch(registerUser(formData));
  };

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <body className="font-mono  bg-gray-400">

      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">

          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div>
              <img className='' src="https://lzd-img-global.slatic.net/g/p/a47d1b1a9942ae9a769b9e8e598b3fea.png_1200x1200q80.png_.webp" alt="" />
            </div>


            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Nhập password của bạn"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="passwordConfirmation">
                      Confirm Password
                    </label>
                   
                    <input
                      type="password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      placeholder="Nhập passwordConfirmation của bạn"
                      value={formData.passwordConfirmation}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                 
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </button>
                </div>
                {errorMessage && (
                  <div className="text-red-500">
                    <p>{errorMessage}</p>
                  </div>
                )}
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="./signin"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default SignUp;
