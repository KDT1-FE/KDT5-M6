import "@/Components/Common/Content_modal.scss";

export const Description: React.FC<DescriptionProps>
  = ({ isDiv, id, state, item, handleChange,handleBlur }) => {
  return (
    <div>
      {isDiv
        ?
        <input
          id={id}
          onChange={(e) => handleChange(item._id, e)}
          onBlur={() => handleBlur(item._id)}
          type="text"
          value={state.id === item._id ? state.description : item.description}
        />
        :
        <div
          id={id}
          className="description"
        >
          {item.description}
        </div>
      }
    </div>
  );
};