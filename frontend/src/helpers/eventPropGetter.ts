export const eventPropGetter = (event: any) => {
    let backgroundColor = "";
    switch (event.importance) {
      case "Простые работы":
        backgroundColor = "#aae0ff";
        break;
      case "Работы повышенной сложности":
        backgroundColor = "orange";
        break;
      default:
        backgroundColor = "blue";
    }
    return { style: { backgroundColor } };
  };