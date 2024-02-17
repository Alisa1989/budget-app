import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Expenses from "./Expenses";
import Budgets from "./Budgets";
import { Box, Container, Grid} from "@mui/material";
import PieChartPage from "./PieChartPage";
import BasicModal from "../components/BasicModal";
// import CreatePage from "./CreatePage";
import Spinner from "../components/Spinner";
import { reset } from "../features/expenses/ExpenseSlice";

function Home({ setEditPurchase }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading, isError, message } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    if (isError) {
      console.log(message, isError);
    }

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  //expenses grouped by category
  const groupedExpenses = expenses.reduce((expense, item) => {
    const category = item.category;
    const price = item.price;
    if (!expense.hasOwnProperty(category)) {
      expense[category] = 0;
    }
    expense[category] += price;
    return expense;
  }, {});

  const grandTotal = expenses.reduce((total, item) => {
    return total + item.price;
  }, 0)

  if (isLoading) {
    return <Spinner />;
  }
  console.log("expenses", expenses)

  return (
    <Container>
      <BasicModal
        title=""
        buttonIcon="Getting Started"
        modalTitle="First Things First"
        description="Start by adding a purchase from the list of expenses. The budget setting feature is not essential."
      />
      <Box sx={{display: {xs:"none", md:"block"}, padding: {sm:0, md:0.5}}}>
        <h2>Welcome {user && user.email} to your expenses dashboard</h2>
      </Box>
      {/* <CreatePage /> */}
      <Grid container sx={{flexFlow: {xs: "column", sm:"column", md: "row" }}}>
        <Grid item order={{xs:2, sm: 2, md: 1}} width={1}>
          <Expenses
            setEditPurchase={setEditPurchase}
            // setExpenses = {setExpenses}
            expenses={expenses}
          />
        </Grid>
        <Grid item order={{xs:1, sm: 1, md: 2}} width={1}>
          <PieChartPage grandTotal={grandTotal} groupedExpenses={groupedExpenses} />
        </Grid>
        <Grid item order={{xs:3, sm: 3, md: 3}}>
          <Budgets groupedExpenses={groupedExpenses} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
