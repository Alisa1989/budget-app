import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";


Chart.register(CategoryScale);
 
function PieChartPage({expenses}) {

    console.log("RENDERING");

    const removeDuplicates = (arr) => {
        let unique = [];
        arr.forEach(element => {
            if (!unique.includes(element)) {
                unique.push(element)
            };
        });
        return unique;
    }
    
    const categories = expenses.map((elem) => {
        return elem.category
        });

    // returns the sum of the prices of that category
    const categoryPriceSums = (cat) => {
        const result = expenses.filter((elem) => elem.category === cat);
        let adder = 0;
        result.forEach(elem => {
            adder += elem.price;
        });
        return adder.toFixed(2);
    };
        
        // insert microservice here ------------------
    // fetch(raw)
    //     .then(r => r.text())
    //     .then(textRead => {
    //     console.log('text decoded:', textRead);
    //     });

        // --------------------------------------------

    
    // returns an array with the price sums in the same order of their respective category
    const sumsArray = (cats) => {
        let sums = [];
        cats.forEach((elem) => {
            sums.push(categoryPriceSums(elem));
        });
        console.log("sums", sums)
        return sums;
    };

    // const [uniqueCategories, setUniqueCategories] = useState(removeDuplicates(categories));
    // const [sumAmounts, setSumAmounts] = useState(sumsArray(uniqueCategories));
    
    // useEffect(() => {
    // setUniqueCategories(removeDuplicates(categories));
    // setSumAmounts(sumsArray(uniqueCategories));
    // }, [])
    
    const BGColors = [
        "#42A5F5",
        "#66BB6A",
        "#FFA726",
        "#d90000",
        "#8a0bd9",
        "#1a3dd9",
        "#42d13b"
    ];
    const BGHoverColors = [
        "#64B5F6",
        "#81C784",
        "#FFB74D",
        "#f70000",
        "#a940df",
        "#1f48ff",
        "#75df66"
    ];
    
    const uniqueCategories = removeDuplicates(categories);
    const sumAmounts = sumsArray(uniqueCategories);
    
    console.log("change UC", uniqueCategories, "SA", sumAmounts);

    const initialState = {
        // labels: categories.filter((item, index) => categories.indexOf(item) === index), 
        labels: uniqueCategories, 
        datasets: [
            {
                label: "Expenses",
                data: sumAmounts,
                backgroundColor: BGColors.slice(0, categories.length),
                hoverBackgroundColor: BGHoverColors.slice(0, categories.length),
                borderColor: "black",
                borderWidth: 2
            }
        ]}

    const [chartData, setChartData] = useState(initialState);
     
    useEffect(() => {
      console.log("use effect called");
      setChartData(chartData => ({
        ...chartData,
        labels: uniqueCategories,
        data: sumAmounts          
      }))
    }, [expenses])

  console.log("chartData", chartData);
 
  return (
    <div>
      <BasicModal
                title= "Pie Chart"
                buttonIcon= {<FcInfo />}
                modalTitle="The Pie Chart"
                description="Gives you an overall view of your spending habits"
                />
      {chartData && <PieChart chartData={chartData} />}
    </div>
  );
}

export default PieChartPage;



    //         // labels: [
    //         //   'Red',
    //         //   'Blue',
    //         //   'Yellow'
    //         // ],
    //         // datasets: [{
    //         //   label: 'My First Dataset',
    //         //   data: [300, 50, 100],
    //         //   backgroundColor: [
    //         //     'rgb(255, 99, 132)',
    //         //     'rgb(54, 162, 235)',
    //         //     'rgb(255, 205, 86)'
    //         //   ],
    //         //   hoverOffset: 4
    //         // }]