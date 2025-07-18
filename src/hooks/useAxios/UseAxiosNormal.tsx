import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}`,
});
const UseAxios = () => {

  //   useEffect(() => {
  //     axiosInstanceNormal.interceptors.response.use(
  //       (response) => {
  //         return response;
  //       },
  //       (error) => {
  //         console.log("error from interceptor : ", error);
  //         if (error?.response?.date?.success) {
  //           Swal.fire({
  //             title: error?.response?.date?.message,
  //             icon: "error",
  //           });
  //         }
  //         return Promise.reject(error);
  //       }
  //     );
  //   }, [logout, navigate]);

  return axiosInstance;
};

export default UseAxios;
