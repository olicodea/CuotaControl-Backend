export const findHomeData = () => {
    const homeData = {
      totalDeuda: "500.230,33",
      totalAFavor: "1.540.230,33",
      totalDeudaPago: "539.080,62",
      totalAFavorPago: "235.108,26",
      vencimientosDeuda: [
        {
          nroPrestamo: "1",
          cuotaNro: "3/6",
          fechaVencimiento: "25/09/2024"
        },
        {
          nroPrestamo: "2",
          cuotaNro: "2/6",
          fechaVencimiento: "26/09/2024"
        }
      ],
      vencimientosAFavor: [
        {
          nroPrestamo: "3",
          cuotaNro: "4/12",
          fechaVencimiento: "30/09/2024"
        },
        {
          nroPrestamo: "4",
          cuotaNro: "2/6",
          fechaVencimiento: "16/09/2024"
        }
      ]
    };
  
    return homeData;
  };