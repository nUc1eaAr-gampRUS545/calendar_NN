import RecipeReviewCard from "../Components/CardApplication";
import CreateApplicationPopup from "../Components/Popup/CreateApplicationPopup";

const Applications: React.FC = () => {
  return (
    <>
      <RecipeReviewCard />
      <CreateApplicationPopup
        open={true}
        onClose={() => {}}
        onCreate={function (formValues: {
          name: string;
          surname: string;
          start_date: string;
          due_date: string;
          tell: string;
          responsiblePerson: string;
          organization: string;
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default Applications;
