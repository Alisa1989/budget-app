import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";
import CreateBudget from "../components/CreateBudget";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/budgets/BudgetSlice";
import Spinner from "../components/Spinner";
import { Button } from '@mui/material';
import SingleBudget from "../components/SingleBudget";


const Budgets = ({groupedExpenses}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { budgets, isLoading, isError, message } = useSelector(
    (state) => state.budgets
  );

  const handleEditBudget = () => {
    navigate(`/edit-budget`)
  }

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

  if (isLoading) {
    return <Spinner />;
  }
  console.log("budgets", budgets)

  return (
    <div>
        <BasicModal
                title= "Budgets"
                buttonIcon= {<FcInfo />}
                modalTitle="Budgets"
                description="Budgets allow you to set your spending goals. You can Add, Modify, or delete a budget."
                />
        <Button title="Edit Budgets" className="wait" variant="contained" size="small" onClick={handleEditBudget}>Edit Budgets</Button>
        {budgets && budgets.map((item, index) =>(
          <SingleBudget item={item} key={index} groupedExpenses={groupedExpenses}/>
        ))}
        <CreateBudget />
    </div>
  )
}

export default Budgets