import colors from "@/lib/theme/color";
import { OptionT } from "@/lib/type";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
} from "@chakra-ui/react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { StylesConfig } from "react-select";

import CreatableSelect from "react-select/creatable";
type Props = InputProps & {
  label?: string;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  disable?: boolean;
  onValueChange?: (value: OptionT) => void;
  options?: OptionT[];
  placeholder?: string;
};
export const Select = ({
  label,
  errorMessage,
  onValueChange,
  options = [],
  placeholder,
}: Props) => {
  const customControlStyles = {
    textTransform: "capitalize",
    fontWeight: "light",
    borderRadius: "4px",
    boxShadow: "none",
    border: `1px solid ${colors.gray[200]}`,
    "&:hover": {
      boxShadow: `0 0 0 1px ${colors.primary["500"]}`,
      borderColor: "primary.500",
    },
    "&:focus": {
      boxShadow: `0 0 0 1px ${colors.primary["500"]}`,
      borderColor: "primary.500",
    },
  };

  const customSelectStyle = () => {
    return {
      indicatorSeparator: () => ({
        display: "none",
      }),
      control: (provided: any) => ({
        ...provided,
        ...customControlStyles,
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? `${colors.primary[500]}` : "white",
        fontWeight: state.isSelected ? "bold" : "medium",
        boxShadow: "none",
        cursor: "pointer",
        textTransform: "capitalize",
        "&:hover": {
          color: "black",
          backgroundColor: `${colors.primary[100]}`,
        },
      }),
    } as StylesConfig<OptionT, false>;
  };
  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && (
        <FormLabel sx={{ fontSize: { base: "14px", md: `16px` } }}>
          {label}
        </FormLabel>
      )}
      <CreatableSelect
        placeholder={placeholder}
        options={options}
        styles={customSelectStyle()}
        onChange={(e) => {
          if (e) {
            if ((e as OptionT & { __isNew__?: boolean })?.__isNew__) {
              const value = { value: "", label: e?.label ?? "" };
              onValueChange?.(value);
            } else {
              onValueChange?.({ label: e.label, value: e.value });
            }
          }
        }}
      />

      {errorMessage && (
        <FormErrorMessage
          sx={{
            fontSize: { base: "10px", md: "10px" },
            mt: "4px",
            position: "absolute",
          }}
        >
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
