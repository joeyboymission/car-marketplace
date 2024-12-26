import PropTypes from "prop-types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function DropdownField({item, handleInputChange}) {
  return (
    <div>
      <Select required={item.required} onValueChange={(value) => handleInputChange(item.name, value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={item.initialName} />
        </SelectTrigger>
        <SelectContent>
            {
                item?.options.map((option, index) => (
                    <SelectItem key={index} value={option}>{option}</SelectItem>
                ))
            }
        </SelectContent>
      </Select>
    </div>
  );
}

// Validate the 'item' and 'handleInputChange' prop
DropdownField.propTypes = {
    item: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

export default DropdownField;
