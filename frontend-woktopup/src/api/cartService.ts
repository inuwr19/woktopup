import axiosTest from "../plugins/axios";

const cartService = {
  addToCart : async (payload: {
    user_id: string;
    product_id: number;
    game_account_id: string;
    quantity: number;
    total_price: number;
  }) => {
    return await axiosTest.post("/orders", payload);
  }
};

export default cartService;
// export const addToCart = async (payload: {
//   user_id: string;
//   product_id: number;
//   game_account_id: string;
//   quantity: number;
//   total_price: number;
// }) => {
//   return await axiosTest.post("/orders", payload);
// };