 return (
    <div>
      <BasicModal
                title= {pieChartTitle} 
                buttonIcon= {<FcInfo />}
                modalTitle="The Pie Chart"
                description="Gives you an overall view of your spending habits"
                />
                <div className="piechart-container">
                  <Button onClick={previousMonth}
                    title="previous month" 
                    className="piechart-buttons left">
                    <SlArrowLeft/>
                  </Button>
                  {/* if chartData.label.length == 0 - display predicted data */}
                  <PieChart chartData={chartData}/>
                  <Button onClick={nextMonth}
                    title="next month" 
                    className="piechart-buttons right">
                    <SlArrowRight/>
                  </Button>
                </div>
                  
      {`This Month's Total: ${grandTotal}`}
      <CreatePage
        categories={categories}
      />
    </div>
  );