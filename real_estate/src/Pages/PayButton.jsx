import axios from "axios";
import { useContext } from "react";
import AuthContext from '../context/authContext'; // Update the path

const PayButton = () => {
  const { user } = useContext(AuthContext);
  const handleCheckout = () => {
    axios
      .post(`http://localhost:3000/api/payment/newpayment`)
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;