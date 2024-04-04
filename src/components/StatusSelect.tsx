import { forwardRef } from "react";

type MySelectProps = {
  categories: { value: string; label: string }[];
};

const MySelect = forwardRef<HTMLSelectElement, MySelectProps>(
  ({ categories }, ref) => {
    return (
      <select ref={ref}>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    );
  }
);

export default MySelect;
