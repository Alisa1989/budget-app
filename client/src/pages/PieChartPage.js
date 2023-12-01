import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";
import PieChart from "../components/PieChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
 
function PieChartPage({groupedExpenses}) {
 
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

    const chartData = {
        labels: Object.keys(groupedExpenses), 
        datasets: [
            {
                label: "Expenses",
                data: Object.values(groupedExpenses),
                backgroundColor: BGColors.slice(0, Object.keys(groupedExpenses).length),
                hoverBackgroundColor: BGHoverColors.slice(0, Object.keys(groupedExpenses).length),
                borderColor: "black",
                borderWidth: 2
            }
        ]}

  return (
    <div>
      <BasicModal
                title= "Pie Chart"
                buttonIcon= {<FcInfo />}
                modalTitle="The Pie Chart"
                description="Gives you an overall view of your spending habits"
                />
      <PieChart chartData={chartData}/>
    </div>
  );
}

export default PieChartPage;
