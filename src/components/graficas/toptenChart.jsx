import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import { baseURL } from '../../redux/actions';

const TopTen = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la ruta utilizando Axios
    axios.get(baseURL +'/metrics/ten')
      .then(response => {
        // Extraer los datos que necesitas de la respuesta
        const products = response.data;
        const productNames = products.map(product => product.name);
        const productQuantities = products.map(product => product.totalQuantity);

        setLabels(productNames);
        setData(productQuantities);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  // Configurar los datos para el gráfico
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Ventas',
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.8)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data,
      },
    ],
  };

  const options = {
    scales: {
        x: {
            ticks: {
                callback: function(value) {
                    if (value.length > 10) {
                        return value.substr(0, 1) + '...';
                    } else {
                        return value;
                    }
                }
            }
        }
    }
  };

  return (
    <div>
      <h2>Top 10 Productos más Vendidos</h2>
      <div style={{ height: '400px', width: '100%' }}>
        <Line data={chartData} options={options}/>
      </div>
    </div>
  );
}

export default TopTen;
