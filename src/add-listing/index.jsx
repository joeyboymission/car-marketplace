// Import the JSON data from the 'Shared' folder
import carDetails from "./../Shared/carDetails.json";
import features from "./../Shared/features.json"

// Import the components
import Header from "@/components/Header";
import InputField from "./components/inputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";

// Import the 'Separator', 'Checkbox' and 'Button' component
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Import icons and images
import { Loader } from "lucide-react"; // Change LoaderCircle to Loader

import PropTypes from "prop-types";
import { useState } from "react";
import { CarListing } from "./../../configs/schema";
import { db } from "./../../configs";
import { useNavigate } from "react-router";


function AddListing() {
  // Declare the 'formData', 'featuresData' and 'imageUrls' state variable using the 'useState' hook
  const [formData, setFormData] = useState([]);  // Change back to array
  const [featuresData, setFeaturesData] = useState([]);  // Change back to array
  const [triggerUploadImages, setTriggerUploadImages] = useState(null); {/* Change initial state from false to null */} 
  const [loader, setLoader] = useState(false); {/* It will store the loader state */} 
  const navigate = useNavigate(); {/* It will navigate to the specific route */}

  /**
   * Used to save User Input
   * @param {*} name
   * @param {*} value
   */

  // It will handle the input change
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(formData); {/* It will log the form data in the console */}
  };

    /**
   * Used to save Feature List
   * @param {*} name
   * @param {*} value
   */

  // It will handle the features change
  const handleFeaturesChange = (name  , value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(featuresData); {/* It will log the features data in the console */}
  };


  // It will handle the form submission
  const onsubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    toast('Please wait, saving your listing...'); // Fix toast implementation

    try {
      if (Object.keys(formData).length === 0) {
        toast("Please fill in the required fields");
        setLoader(false);
        return;
      }

      // Insert the data into the database both 'formData', 'featuresData' and 'imageUrls'
      const result = await db.insert(CarListing).values({
        ...formData,
        features: featuresData,
        images: [] // Initialize empty array, will be populated by URLs later
      }).returning({id:CarListing.id}).execute();

      if (result && result[0]?.id) {
        setTriggerUploadImages(result[0].id); {/* It will trigger the image upload */}
        console.log("Listing created successfully!");
        toast.success("Listing created successfully!");
      } else {
        toast("Failed to create listing");
        setLoader(false); {/* It will set the loader to false */}
      }
    } catch (error) {
      console.error("Database Error:", error.message);
      toast("Something went wrong");
      setLoader(false);
    }
  };


  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <form className="p-10 bg-white border rounded-xl mt-10" onSubmit={onsubmit}>
          {/* Car Details */}
          <h2 className="font-medium text-xl mb-6">Car Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                carDetails.carDetails.map((item, index) => (
                    <div key={index}>
                      {/* 
                        Condition 1: if the 'FieldType' is 'text' or 'number' then display 'InputField' component
                        Condition 2: if the 'FieldType' is 'dropdown' then display 'DropdownField' component
                        Condition 3: if the 'FieldType' is 'textarea' then display 'Textarea' component
                        Else: return null
                      */}
                        <label className="flex items-center gap-2 mb-2 text-sm"><IconField icon={item.icon}/>{item?.label} {item.required && <span className="text-red-500">*</span>}</label>
                        {
                          item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} handleInputChange={handleInputChange}/>
                          : item.fieldType == 'dropdown' ? <DropdownField item={item} handleInputChange={handleInputChange}/>
                          : item.fieldType == 'textarea' ? <TextAreaField item={item} handleInputChange={handleInputChange}/>
                          : null
                        }
                    </div>
                ))
            }
          </div>

          <Separator className="my-6"/>
          {/* Feature List Checklist */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                features.features.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox onCheckedChange={(value) => handleFeaturesChange(item.name, value)}/> {/* It returns item.name: value in every ticked checkboxes */}
                    <h2>{item.label}</h2>
                  </div>
                ))
              }
            </div>
          </div>

          <Separator className="my-6"/>
          {/* Car Images */}
          <UploadImages triggerUploadImages={triggerUploadImages} setLoader={(v) => {setLoader(v); navigate('/profile')}}/>

          {/* Submit Button */}
          <div className="flex mt-10 justify-end">
            <Button 
              disabled={loader} 
              type="submit"
            >
              {loader ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

// Validate the 'PropTypes'
InputField.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    fieldType: PropTypes.oneOf(['text', 'number']),
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired  // Added missing PropType
}

DropdownField.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    fieldType: PropTypes.oneOf(['dropdown']),
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired  // Added missing PropType
}

export default AddListing;
