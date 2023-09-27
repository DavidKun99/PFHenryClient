import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import "chart.js/auto";
import { blue } from '@mui/material/colors';
import { baseURL } from '../../redux/actions';


const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    // Supongamos que los datos se obtienen de una API en formato JSON.
    // Aquí realizamos una solicitud a la API utilizando Axios.
    axios.get(baseURL +'/metrics/sales')
      .then((response) => {
        const data = response.data;
        console.log(data)
        // Formateamos las etiquetas (meses) y los datos.
        const formattedData = data.map((entry) => {
          const date = new Date(entry.month)
          const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
         });
          return { month: formattedDate, total_sales: parseFloat(entry.total_sales) };
        });
        setSalesData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  const months = salesData.map((entry) => entry.month);
  const totalSales = salesData.map((entry) => entry.total_sales);


  const data = {
    labels: months,
    datasets: [
      {
        label: 'Ventas por Mes',
        data: totalSales,
        fill: false,
        backgroundColor: "#7DD4FF",
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const options = {
      scales: {
          x: {
              type: 'category', // Configura la escala X como 'category'
              labels: months, // Esto puede ayudar a resolver problemas de escalas no registradas
            },
        },
    };

    
  return (
    <div>
      <h2>Ventas por Mes</h2>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default SalesChart;
