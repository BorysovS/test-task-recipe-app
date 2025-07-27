export type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
};
