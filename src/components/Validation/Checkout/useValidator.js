import { useState } from "react";

import {
  emailValidator,
  contactNumberValidator,
  addressValidator,
  firstNameValidator,
  lastNameValidator,
  cityValidator,
  zipCodeValidator,
} from "./validators";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useValidator = form => {
  const [errors, setErrors] = useState({
    firstName: {
      dirty: false,
      error: false,
      message: ""
    },
    lastName: {
      dirty: false,
      error: false,
      message: ""
    },
    contactNumber: {
      dirty: false,
      error: false,
      message: "",
    },
    addressEmail: {
      dirty: false,
      error: false,
      message: "",
    },
    streetAddress: {
      dirty: false,
      error: false,
      message: "",
    },
    city: {
      dirty: false,
      error: false,
      message: ""
    },
    zipCode: {
      dirty: false,
      error: false,
      message: ""
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { firstName, lastName, contactNumber, addressEmail, streetAddress, city, zipCode } = form;

    if (nextErrors.addressEmail.dirty && (field ? field === "addressEmail" : true)) {
      const addressEmailMessage = emailValidator(addressEmail, form);
      nextErrors.addressEmail.error = !!addressEmailMessage;
      nextErrors.addressEmail.message = addressEmailMessage;
      if (!!addressEmailMessage) isValid = false;
    }

    if (nextErrors.contactNumber.dirty && (field ? field === "contactNumber" : true)) {
      const contactNumberMessage = contactNumberValidator(contactNumber, form);
      nextErrors.contactNumber.error = !!contactNumberMessage;
      nextErrors.contactNumber.message = contactNumberMessage;
      if (!!contactNumberMessage) isValid = false;
    }

    if (nextErrors.streetAddress.dirty && (field ? field === "streetAddress" : true)) {
      const streetAddressMessage = addressValidator(
        streetAddress,
        form
      );
      nextErrors.streetAddress.error = !!streetAddressMessage;
      nextErrors.streetAddress.message = streetAddressMessage;
      if (!!streetAddressMessage) isValid = false;
    }

    if (nextErrors.firstName.dirty && (field ? field === "firstName" : true)) {
      const firstNameMessage = firstNameValidator(firstName, form);
      nextErrors.firstName.error = !!firstNameMessage;
      nextErrors.firstName.message = firstNameMessage;
      if (!!firstNameMessage) isValid = false;
    }

    if (nextErrors.lastName.dirty && (field ? field === "lastName" : true)) {
      const lastNameMessage = lastNameValidator(
        lastName,
        form
      );
      nextErrors.lastName.error = !!lastNameMessage;
      nextErrors.lastName.message = lastNameMessage;
      if (!!lastNameMessage) isValid = false;
    }
    if (nextErrors.city.dirty && (field ? field === "city" : true)) {
      const cityMessage = cityValidator(
        city,
        form
      );
      nextErrors.city.error = !!cityMessage;
      nextErrors.city.message = cityMessage;
      if (!!cityMessage) isValid = false;
    }
    if (nextErrors.zipCode.dirty && (field ? field === "zipCode" : true)) {
      const zipCodeMessage = zipCodeValidator(
        zipCode,
        form
      );
      nextErrors.zipCode.error = !!zipCodeMessage;
      nextErrors.zipCode.message = zipCodeMessage;
      if (!!zipCodeMessage) isValid = false;
    }


    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};