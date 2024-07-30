import { useEffect, useState } from "react";
import RecipeReviewCard from "../Components/CardApplication";
import CreateApplicationPopup from "../Popup/CreateApplicationPopup";
import Button from "@mui/material/Button";
import apiApplications from "../api/apiApplications";
import { forms } from "moduleTypes";
import { ApplicationInterface } from "../utils/constants";

const Applications: React.FC = () => {
  const [openForms, setOpenForms] = useState<boolean>(false);
  const [valuesForms, setValuesForms] = useState<forms>(ApplicationInterface);
  const [applicationsDataBase, setApplicationsDataBase] = useState<any>([]);
  useEffect(() => {
    apiApplications.get().then((data)=>{
      if(data){
        setApplicationsDataBase(data)
      }
      else{
        console.error("No data Applications")
      }
    })
    .catch((err)=>console.log(err))
  }, []);
  return (
    <>
      {applicationsDataBase.map((data) => {
        <RecipeReviewCard />;
      })}

      <CreateApplicationPopup
        open={openForms}
        onClose={() => setOpenForms(!openForms)}
        formValues={valuesForms}
        setValuesForms={setValuesForms}
      />
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Button variant="outlined" onClick={() => setOpenForms(!openForms)}>
          +
        </Button>
      </div>
    </>
  );
};

export default Applications;
