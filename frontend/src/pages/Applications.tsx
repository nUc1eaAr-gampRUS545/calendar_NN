import { useEffect, useState } from "react";
import RecipeReviewCard from "../Components/CardApplication";
import Button from "@mui/material/Button";
import apiApplications from "../api/apiApplications";
import { ApplicationDataBase, IApplication } from "moduleTypes";
import { ApplicationInterface } from "../utils/constants";
import { Grid } from "@mui/material";
import ClickableChips from "../Components/ChipActions";
import { useAtom } from "jotai";
import { users } from "../App";
import UserCard from "../Components/UserOrderCard";
import CreateApplicationPopup from "../Components/Popups/CreateApplicationPopup";

const Applications: React.FC = () => {
  const [openForms, setOpenForms] = useState<boolean>(false);
  const [usersDataBase] = useAtom(users);
  const [pageState, setPageState] = useState<boolean>(false);
  const [valuesForms, setValuesForms] = useState<IApplication>(ApplicationInterface);
  const [applicationsDataBase, setApplicationsDataBase] = useState<any>([]);
  useEffect(() => {
    apiApplications
      .get()
      .then((data) => {
        if (data) {
          setApplicationsDataBase(data);
        } else {
          console.error("No data Applications");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <ClickableChips pageState={pageState} setPageState={setPageState} />
      {!pageState ? (
        <>
          <Grid container spacing={8} style={{ margin: "50px" }}>
            {applicationsDataBase.map((data: ApplicationDataBase) => (
              <RecipeReviewCard card={data} />
            ))}
          </Grid>
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
      ) : (
        <>
          {usersDataBase.filter((data)=>!data.is_active).map((i) => (
            <UserCard user={i} />
          ))}
        </>
      )}
    </>
  );
};

export default Applications;
