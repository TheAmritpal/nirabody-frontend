// const BASE_URL = "http://localhost:8000/api/get-image";
// // const BASE_URL = "https://fwice.in/admin/api/get-image";


// export const getImageUrl = (path) => {
//   if (!path) return "/404.png";
//   return `${BASE_URL}?path=${encodeURIComponent(path)}`;
// };
import { apiUrl } from './backend/pages/https';

const BASE_URL = `${apiUrl}/get-image`;

export const getImageUrl = (path) => {
  if (!path) return "/404.png";
  
  // Remove duplicate sliders folder
  let cleanPath = path.replace('/storage/sliders/sliders/', 'storage/sliders/');
  
  return `${BASE_URL}?path=${encodeURIComponent(cleanPath)}`;
};