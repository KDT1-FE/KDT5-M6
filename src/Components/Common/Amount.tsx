import "@/Components/Common/Content_modal.scss";

export const Amount: React.FC<DescriptionProps>
  = ({ isDiv, id, state, item, handleChange,handleBlur }) => {
  return (
    <>
      {isDiv
        ?
        <input
          id={id}
          onChange={(e) => handleChange(item._id, e)}
          onBlur={() => handleBlur(item._id)}
          type="text"
          value={state.id === item._id ? state.amount : item.amount}
        />
        :
        <div
          id={id}
        >
          {item.amount.toLocaleString()}원
        </div>
      }
    </>
  );
};
