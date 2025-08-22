import { Product } from "@/components/product-results/ProductCard";

export const sortOptions = [
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
];

export const conditions = ["New", "Used"];

export function filterAndSortProducts(
  products: Product[],
  selectedCategories: string[],
  selectedConditions: string[],
  sortBy: string
): Product[] {
  let filtered = products;

  // Filter by selected categories
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(product => selectedCategories.includes(product.category));
  }

  // Filter by selected conditions
  if (selectedConditions.length > 0) {
    filtered = filtered.filter(product => selectedConditions.includes(product.condition));
  }

  // Sort products
  switch (sortBy) {
    case "Alphabetically, A-Z":
      return filtered.sort((a, b) => a.title.localeCompare(b.title));
    case "Alphabetically, Z-A":
      return filtered.sort((a, b) => b.title.localeCompare(a.title));
    case "Price, low to high":
      return filtered.sort((a, b) => a.price - b.price);
    case "Price, high to low":
      return filtered.sort((a, b) => b.price - a.price);
    default:
      return filtered;
  }
}

export function paginateProducts(products: Product[], currentPage: number, itemsPerPage: number): Product[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return products.slice(startIndex, endIndex);
}

// Mock data - University coursebooks (example for one category)
export const mockCourseBooks: Product[] = [
  { id: 1, title: "Calculus: Early Transcendentals", author: "James Stewart", price: 89.99, condition: "New", category: "Engineering General", image: "/assets/book1.jpg" },
  { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen", price: 75.50, condition: "Used", category: "Software Engineering", image: "/assets/book2.jpg" },
  { id: 3, title: "Mechanics of Materials", author: "Russell C. Hibbeler", price: 95.25, condition: "New", category: "Mechanical Engineering", image: "/assets/book3.jpg" },
  { id: 4, title: "Electric Circuits", author: "James W. Nilsson", price: 82.75, condition: "Used", category: "Electrical and Electronic Engineering", image: "/assets/book4.jpg" },
  { id: 5, title: "Structural Analysis", author: "R.C. Hibbeler", price: 105.00, condition: "New", category: "Civil Engineering", image: "/assets/book5.jpg" },
  { id: 6, title: "Clean Code", author: "Robert C. Martin", price: 42.99, condition: "Used", category: "Software Engineering", image: "/assets/book6.jpg" },
  { id: 7, title: "Biomechanics", author: "Y.C. Fung", price: 128.50, condition: "New", category: "Biomedical Engineering", image: "/assets/book7.jpg" },
  { id: 8, title: "Chemical Engineering Design", author: "Ray Sinnott", price: 91.25, condition: "Used", category: "Chemical and Materials Engineering", image: "/assets/book8.jpg" },
  { id: 9, title: "Steel Design", author: "William T. Segui", price: 79.99, condition: "New", category: "Structural Engineering", image: "/assets/book9.jpg" },
  { id: 10, title: "Control Systems Engineering", author: "Norman S. Nise", price: 113.00, condition: "Used", category: "Mechatronics Engineering", image: "/assets/book10.jpg" },
  { id: 11, title: "Computer Organization and Design", author: "David A. Patterson", price: 68.75, condition: "New", category: "Computer Systems Engineering", image: "/assets/book11.jpg" },
  { id: 12, title: "Engineering Design Process", author: "Yousef Haik", price: 72.50, condition: "Used", category: "Engineering Science", image: "/assets/book12.jpg" },
  { id: 13, title: "Linear Algebra and Its Applications", author: "Gilbert Strang", price: 84.25, condition: "New", category: "Engineering General", image: "/assets/book13.jpg" },
  { id: 14, title: "Data Structures and Algorithms", author: "Michael T. Goodrich", price: 59.99, condition: "Used", category: "Software Engineering", image: "/assets/book14.jpg" },
  { id: 15, title: "Fluid Mechanics", author: "Frank M. White", price: 96.75, condition: "New", category: "Mechanical Engineering", image: "/assets/book15.jpg" },
  { id: 16, title: "Microelectronic Circuits", author: "Adel S. Sedra", price: 85.50, condition: "Used", category: "Electrical and Electronic Engineering", image: "/assets/book16.jpg" },
  { id: 17, title: "Construction Planning and Scheduling", author: "Jimmie W. Hinze", price: 78.25, condition: "New", category: "Civil Engineering", image: "/assets/book17.jpg" },
  { id: 18, title: "Database System Concepts", author: "Abraham Silberschatz", price: 71.00, condition: "Used", category: "Software Engineering", image: "/assets/book18.jpg" },
  { id: 19, title: "Biomaterials Science", author: "Buddy D. Ratner", price: 132.99, condition: "New", category: "Biomedical Engineering", image: "/assets/book19.jpg" },
  { id: 20, title: "Physical Chemistry", author: "Peter Atkins", price: 87.75, condition: "Used", category: "Chemical and Materials Engineering", image: "/assets/book20.jpg" },
  { id: 21, title: "Concrete Design", author: "Edward G. Nawy", price: 101.50, condition: "New", category: "Structural Engineering", image: "/assets/book21.jpg" },
  { id: 22, title: "Robotics: Control, Sensing, Vision", author: "Fu, Gonzalez & Lee", price: 119.25, condition: "Used", category: "Mechatronics Engineering", image: "/assets/book22.jpg" },
  { id: 23, title: "Computer Networks", author: "Andrew S. Tanenbaum", price: 63.99, condition: "New", category: "Computer Systems Engineering", image: "/assets/book23.jpg" },
  { id: 24, title: "Engineering Ethics", author: "Charles E. Harris", price: 45.50, condition: "Used", category: "Engineering Science", image: "/assets/book24.jpg" },
  { id: 25, title: "Differential Equations", author: "Dennis G. Zill", price: 76.99, condition: "New", category: "Engineering General", image: "/assets/book25.jpg" },
  { id: 26, title: "Software Engineering", author: "Roger S. Pressman", price: 88.75, condition: "Used", category: "Software Engineering", image: "/assets/book26.jpg" },
  { id: 27, title: "Machine Design", author: "Robert L. Norton", price: 124.00, condition: "New", category: "Mechanical Engineering", image: "/assets/book27.jpg" },
  { id: 28, title: "Signals and Systems", author: "Alan V. Oppenheim", price: 92.25, condition: "Used", category: "Electrical and Electronic Engineering", image: "/assets/book28.jpg" },
  { id: 29, title: "Geotechnical Engineering", author: "Braja M. Das", price: 97.50, condition: "New", category: "Civil Engineering", image: "/assets/book29.jpg" },
  { id: 30, title: "Design Patterns", author: "Erich Gamma", price: 54.99, condition: "Used", category: "Software Engineering", image: "/assets/book30.jpg" },
  { id: 31, title: "Medical Instrumentation", author: "John G. Webster", price: 145.75, condition: "New", category: "Biomedical Engineering", image: "/assets/book31.jpg" },
  { id: 32, title: "Transport Phenomena", author: "R. Byron Bird", price: 103.25, condition: "Used", category: "Chemical and Materials Engineering", image: "/assets/book32.jpg" },
];

// Example categories for different product types
export const engineeringMajors = [
  "Biomedical Engineering",
  "Chemical and Materials Engineering",
  "Civil Engineering",
  "Computer Systems Engineering",
  "Electrical and Electronic Engineering",
  "Engineering General",
  "Engineering Science",
  "Mechanical Engineering",
  "Mechatronics Engineering",
  "Software Engineering",
  "Structural Engineering",
];

export const notebookTypes = [
  "Spiral Bound",
  "Ring Binder",
  "Composition",
  "Lab Notebook",
  "Graph Paper",
  "Lined Paper",
  "Blank Paper",
];

export const writingSuppliesTypes = [
  "Pens",
  "Pencils",
  "Markers",
  "Highlighters",
  "Erasers",
  "Rulers",
  "Calculators",
];
