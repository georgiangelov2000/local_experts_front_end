import Select from "react-select";
import { useTranslation } from "react-i18next";

function SortSelect({ state, dispatch, customSelectStyles }) {
  const { t } = useTranslation();

  // Prepare translated options
  const translatedOptions = state.sortOptions.map(opt => ({
    ...opt,
    label: t(opt.label) // translate using key
  }));

  return (
    <Select
      options={translatedOptions}
      value={
        translatedOptions.find(opt => opt.value === state.filters.sort) || null
      }
      onChange={(option) => {
        dispatch({
          type: "UPDATE_FILTER",
          payload: { sort: option ? option.value : "" }
        });
      }}
      placeholder={t("sort.placeholder")} // e.g., "Sort results..."
      isClearable
      styles={customSelectStyles}
    />
  );
}

export default SortSelect;
