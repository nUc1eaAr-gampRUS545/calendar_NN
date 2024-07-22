import styled from "styled-components";

const StyledDatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .react-datepicker__input-container input:focus {
    border-color: #007bff;
    outline: none;
  }

  .react-datepicker {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__day--selected {
    background-color: #007bff;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #0056b3;
    color: white;
  }
`;
export const stylesDrop = {
  dragActive: {
    width: "50vw",
    height: "400px",
    backgroundColor: "#badfff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    border: "2px dashed white",
    borderRadius: "10px",
    fontSize: "20px",
    transition: "background-color 0.3s ease-in-out",
    cursor: "pointer",
  }
};
export default StyledDatePickerWrapper;
