// import { useContext, useEffect } from "react";
// import { myContext } from "./Context";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Card from "react-bootstrap/Card";

// import Usernav from "./Usernav";

// export default function Likey() {
//   const { product, like, setLike } = useContext(myContext);
//   const email = localStorage.getItem("userEmail");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchLike();
//   }, []);

//   const fetchLike = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/getlike",
//         {
//           userEmail: email,
//           productId: product._id,
//         }
//       );

//       setLike(response.data.likeItem);
//     } catch (error) {
//       console.error("error fetching cart:", error);
//     }
//   };

//   const likeData = like.map((item) => item.productId);
//   const likeProducts = product.filter((productData) =>
//     likeData.includes(productData._id)
//   );
//   console.log("like", like, likeData, likeProducts);

//   return (
//     <div>
//       <Usernav />
//       <h2>your like</h2>
//       <div>
//         {likeProducts.map((val) => 
//           <Card
//             className="body"
//             style={{ width: "20rem", padding: "10px 15px" }}
//           >
//             <Card.Img className="image" variant="top" src={val.image} />
//             <Card.Body>
//               <Card.Title>{val.prod_name}</Card.Title>
//               <Card.Text>₹{val.price}/-</Card.Text>
//               <Card.Text>{val.description} </Card.Text>
//             </Card.Body>
//             <Card.Body>
//               <div style={{ marginLeft: "40px" }}>
//                 <button
//                   className="btn btn-success rounded-lg text-decoration-none ml-2"
//                   onClick={() => navigate(`/descript/${val._id}`)}
//                 >
//                   Details
//                 </button>
//                 {/* <button style={{marginLeft:'20px'}}
//                 className="btn btn-danger"
//                 onClick={() => confirmDelete(val)}
//               >
//                 Delete
//               </button> */}
//               </div>
//             </Card.Body>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }
