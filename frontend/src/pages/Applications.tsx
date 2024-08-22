import { useEffect, useState } from "react";
import RecipeReviewCard from "../Components/CardApplication";
import Button from "@mui/material/Button";
import apiApplications from "../api/apiApplications";
import { IApplicationDataBase, IApplication } from "moduleTypes";
import { ApplicationInterface } from "../utils/constants";
import { Grid, Typography } from "@mui/material";
import ClickableChips from "../Components/ChipActions";
import { useAtom } from "jotai";
import { users } from "../App";
import UserCard from "../Components/UserOrderCard";
import CreateApplicationPopup from "../Components/Popups/CreateApplicationPopup";
import { styleColumnApplications } from "../styledComponents/columnApplications";


const Applications: React.FC = () => {
  const [openForms, setOpenForms] = useState<boolean>(false);
  const [usersDataBase] = useAtom(users);
  const [pageState, setPageState] = useState<boolean>(false);
  const [valuesForms, setValuesForms] =
    useState<IApplication>(ApplicationInterface);
   const [applicationsDataBase, setApplicationsDataBase] = useState<any>([]);
 
  useEffect(() => {
    apiApplications
      .get()
      .then((res) => {
        if (res.data) {
          setApplicationsDataBase(res.data);
        } else {
          console.error("No data Applications");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Фильтрация заявок по этапам выполнения
  const noApprovalApplications = applicationsDataBase.filter(
    (app: IApplicationDataBase) =>
      !app.zone_owner_approval &&
      !app.contractor_supervisor_approval &&
      !app.security_approval &&
      !app.is_completed
  );

  const zoneOwnerApprovedApplications = applicationsDataBase.filter(
    (app: IApplicationDataBase) =>
      app.zone_owner_approval &&
      !app.contractor_supervisor_approval &&
      !app.security_approval &&
      !app.is_completed
  );

  const contractorSupervisorApprovedApplications = applicationsDataBase.filter(
    (app: IApplicationDataBase) =>
      app.zone_owner_approval &&
      app.contractor_supervisor_approval &&
      !app.security_approval &&
      !app.is_completed
  );
  

  const completedApplications = applicationsDataBase.filter(
    (app: IApplicationDataBase) => app.is_completed
  );

  return (
    <>
      <ClickableChips pageState={pageState} setPageState={setPageState} />
      {!pageState ? (
        <>
          <Grid
            container
            spacing={4}
            style={{ margin: "0 auto", width: "90%" }}
          >
            {/* Колонка без подтверждений */}
            <Grid item xs={12} md={4} sx={styleColumnApplications}>
              <Typography
                sx={{ textAlign: "center", height: "100px" }}
                variant="h6"
              >
                No Approvals
              </Typography>
              {noApprovalApplications.map((data: IApplicationDataBase) => (
                <RecipeReviewCard key={data.id} card={data} />
              ))}
            </Grid>

            {/* Колонка подтвержденных владельцем зоны */}
            <Grid item xs={12} md={4} sx={styleColumnApplications}>
              <Typography
                sx={{ textAlign: "center", height: "100px" }}
                variant="h6"
              >
                Zone Owner Approved
              </Typography>
              {zoneOwnerApprovedApplications.map(
                (data: IApplicationDataBase) => (
                  <RecipeReviewCard key={data.id} card={data} />
                )
              )}
            </Grid>
           
            <Grid item xs={12} md={3} sx={styleColumnApplications}>
              <Typography
                sx={{ textAlign: "center", height: "100px" }}
                variant="h6"
              >
                Completed
              </Typography>
              {completedApplications.map((data: IApplicationDataBase) => (
                <RecipeReviewCard key={data.id} card={data} />
              ))}
            </Grid>
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
          {usersDataBase
            .filter((data) => !data.is_active)
            .map((i) => (
              <UserCard user={i} />
            ))}
        </>
      )}
    </>
  );
};
export default Applications;
