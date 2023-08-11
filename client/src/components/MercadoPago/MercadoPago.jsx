import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import styles from "./MercadoPago.module.css";
import Swal from "sweetalert2";

const MercadoPago = ({ totalAmount }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    const fetchPreference = async () => {
      initMercadoPago("TEST-ccf47120-6097-4b48-9ac0-ba94be0334fe");
      try {
        const response = await axios.post("http://localhost:3001/pay", {
          description: "Compra en MMarket",
          price: totalAmount,
          quantity: 1,
        });
        const { id } = response.data;
        setPreferenceId(id);
        setPaymentCompleted(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPreference();
  }, [totalAmount]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mercado Pago</h2>
      {paymentCompleted && preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}
    </div>
  );
};

export default MercadoPago;
