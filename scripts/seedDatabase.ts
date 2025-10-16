import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "../models/Book";
import Notebook from "../models/Notebook";
import WritingSupply from "../models/WritingSupply";
import Other from "../models/Other";

// Load environment variables
dotenv.config();

// Connect to MongoDB
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env');
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Clear existing data
async function clearData() {
  console.log('Clearing existing data...');
  await Book.deleteMany({});
  await Notebook.deleteMany({});
  await WritingSupply.deleteMany({});
  await Other.deleteMany({});
  console.log('Existing data cleared');
}

// Seed course books data
async function seedCourseBooks() {
  console.log('Seeding course books...');
  
  const courseBooks = [
    // Engineering (existing)
    { id: 1, title: "SOFTENG310 Course Book", category: "Software Engineering", degree: "Bachelor of Engineering", major: "Software Engineering", year: 3, condition: "New", price: 67.67, description: "Essential textbook for Software Engineering 310 course covering advanced software development concepts." },
    { id: 2, title: "COMPSCI101 Course Book", category: "Computer Science", degree: "Bachelor of Engineering", major: "Computer Systems Engineering", year: 1, condition: "Used", price: 45.50, description: "Introduction to Computer Science fundamentals and programming concepts." },
    { id: 3, title: "MECHENG210 Course Book", category: "Mechanical Engineering", degree: "Bachelor of Engineering", major: "Mechanical Engineering", year: 2, condition: "New", price: 89.99, description: "Mechanical Engineering principles and design methodologies." },
    
    // Arts
    { id: 4, title: "ARTS101 Introduction to Arts", category: "Literature", degree: "Bachelor of Arts", major: "English Literature", year: 1, condition: "New", price: 55.00, description: "Comprehensive introduction to the study of arts and humanities." },
    { id: 5, title: "HISTORY201 Modern History", category: "History", degree: "Bachelor of Arts", major: "History", year: 2, condition: "Used", price: 42.75, description: "In-depth study of modern historical events and their impact." },
    { id: 6, title: "PHILOSOPHY301 Ethics", category: "Philosophy", degree: "Bachelor of Arts", major: "Philosophy", year: 3, condition: "New", price: 68.25, description: "Advanced study of ethical theories and moral philosophy." },
    
    // Business and Economics
    { id: 7, title: "BUSINESS101 Principles of Business", category: "Management", degree: "Bachelor of Commerce", major: "Business Administration", year: 1, condition: "New", price: 72.50, description: "Fundamental principles of business operations and management." },
    { id: 8, title: "ECONOMICS201 Microeconomics", category: "Economics", degree: "Bachelor of Commerce", major: "Economics", year: 2, condition: "Used", price: 58.99, description: "Detailed study of microeconomic principles and market behavior." },
    { id: 9, title: "ACCOUNTING301 Advanced Accounting", category: "Accounting", degree: "Bachelor of Commerce", major: "Accounting", year: 3, condition: "New", price: 95.00, description: "Advanced accounting principles and financial reporting." },
    
    // Creative Arts and Industries
    { id: 10, title: "DESIGN101 Visual Design Principles", category: "Design", degree: "Bachelor of Design", major: "Graphic Design", year: 1, condition: "New", price: 65.00, description: "Introduction to visual design principles and creative processes." },
    { id: 11, title: "ARCHITECTURE201 Building Design", category: "Architecture", degree: "Bachelor of Architecture", major: "Architecture", year: 2, condition: "Used", price: 88.75, description: "Principles of architectural design and building construction." },
    
    // Education and Social Work
    { id: 12, title: "EDUCATION101 Teaching Methods", category: "Education", degree: "Bachelor of Education", major: "Primary Education", year: 1, condition: "New", price: 62.50, description: "Fundamental teaching methods and educational psychology." },
    { id: 13, title: "SOCIALWORK201 Social Policy", category: "Social Work", degree: "Bachelor of Social Work", major: "Social Work", year: 2, condition: "Used", price: 54.25, description: "Study of social policies and their impact on communities." },
    
    // Law
    { id: 14, title: "LAW101 Introduction to Law", category: "Constitutional Law", degree: "Bachelor of Laws", major: "Law", year: 1, condition: "New", price: 78.99, description: "Introduction to legal principles and constitutional law." },
    { id: 15, title: "LAW301 Contract Law", category: "Contract Law", degree: "Bachelor of Laws", major: "Law", year: 3, condition: "Used", price: 92.50, description: "Advanced study of contract law and legal obligations." },
    
    // Medicine & Health Science
    { id: 16, title: "MEDICINE101 Human Anatomy", category: "Anatomy", degree: "Bachelor of Medicine", major: "Medicine", year: 1, condition: "New", price: 125.00, description: "Comprehensive study of human anatomy and physiology." },
    { id: 17, title: "NURSING201 Clinical Practice", category: "Nursing", degree: "Bachelor of Nursing", major: "Nursing", year: 2, condition: "Used", price: 75.25, description: "Clinical practice guidelines and patient care principles." },
    
    // Science
    { id: 18, title: "BIOLOGY101 General Biology", category: "Biology", degree: "Bachelor of Science", major: "Biology", year: 1, condition: "New", price: 69.99, description: "Introduction to biological principles and life sciences." },
    { id: 19, title: "CHEMISTRY201 Organic Chemistry", category: "Chemistry", degree: "Bachelor of Science", major: "Chemistry", year: 2, condition: "Used", price: 82.50, description: "Study of organic chemistry and molecular structures." },
    { id: 20, title: "PHYSICS301 Quantum Physics", category: "Physics", degree: "Bachelor of Science", major: "Physics", year: 3, condition: "New", price: 98.75, description: "Advanced study of quantum mechanics and particle physics." }
  ];

  await Book.insertMany(courseBooks);
  console.log(`Seeded ${courseBooks.length} course books`);
}

// Seed notebooks data
async function seedNotebooks() {
  console.log('Seeding notebooks...');
  
  const notebooks = [
    { id: 101, title: "Pink A5 Notebook Lined", type: "Hardcover Notebooks", cover_type: "Hard Cover", page_style: "Lined", price: 12.99, description: "Beautiful pink hardcover notebook with lined pages, perfect for note-taking." },
    { id: 102, title: "Blue A4 Spiral Pad", type: "A4 Pads", cover_type: "Soft Cover", page_style: "Lined", price: 8.50, description: "Blue spiral-bound A4 pad with lined pages for everyday use." },
    { id: 103, title: "Green Dot Grid Journal", type: "Dot Grid", cover_type: "Soft Cover", page_style: "Dot Grid", price: 15.75, description: "Green dot grid journal perfect for bullet journaling and creative note-taking." },
    { id: 104, title: "Black Hardcover Notebook", type: "Hardcover Notebooks", cover_type: "Hard Cover", page_style: "Blank", price: 18.99, description: "Professional black hardcover notebook with blank pages for sketches and notes." },
    { id: 105, title: "Yellow A5 Softcover", type: "A5 Pads", cover_type: "Soft Cover", page_style: "Lined", price: 6.99, description: "Bright yellow A5 softcover notebook with lined pages." },
    { id: 106, title: "Colorful Sticky Notes Set", type: "Sticky Notes", cover_type: "N/A", page_style: "N/A", price: 4.25, description: "Set of colorful sticky notes in various sizes and colors." },
    { id: 107, title: "Index Tabs Pack", type: "Index Tabs", cover_type: "N/A", page_style: "N/A", price: 3.50, description: "Pack of index tabs for organizing notebooks and documents." },
    { id: 108, title: "White A4 Blank Pad", type: "A4 Pads", cover_type: "Soft Cover", page_style: "Blank", price: 7.99, description: "White A4 pad with blank pages for drawing and writing." }
  ];

  await Notebook.insertMany(notebooks);
  console.log(`Seeded ${notebooks.length} notebooks`);
}

// Seed writing supplies data
async function seedWritingSupplies() {
  console.log('Seeding writing supplies...');
  
  const writingSupplies = [
    { id: 201, title: "Premium Black Ink Ballpoint Pen", category: "Pens", type: "Ballpoint", colour: "Black", ink_type: "Black Ink", price: 5.99, description: "Smooth-writing ballpoint pen with black ink, comfortable grip." },
    { id: 202, title: "Blue Gel Pen Set", category: "Pens", type: "Gel", colour: "Blue", ink_type: "Blue Ink", price: 8.50, description: "Set of blue gel pens with smooth writing experience." },
    { id: 203, title: "Fountain Pen with Gold Nib", category: "Pens", type: "Fountain", colour: "Multi Coloured", ink_type: "Black Ink", price: 25.99, description: "Premium fountain pen with gold nib for elegant writing." },
    { id: 204, title: "Yellow Highlighter Pack", category: "Highlighters", type: "Highlighters", colour: "Yellow", ink_type: "N/A", price: 6.75, description: "Pack of yellow highlighters for marking important text." },
    { id: 205, title: "Fine Liner Set", category: "Fineliners", type: "Fineliners", colour: "Multi Coloured", ink_type: "N/A", price: 12.99, description: "Set of fine liner pens in various colors for detailed work." },
    { id: 206, title: "Mechanical Pencil Set", category: "Pencils", type: "Pencils", colour: "Multi Coloured", ink_type: "N/A", price: 9.25, description: "Set of mechanical pencils with different lead sizes." },
    { id: 207, title: "Pink Eraser Pack", category: "Erasers", type: "Erasers", colour: "Pink", ink_type: "N/A", price: 3.99, description: "Pack of pink erasers for clean erasing." },
    { id: 208, title: "Pencil Sharpener", category: "Sharpeners", type: "Sharpeners", colour: "Multi Coloured", ink_type: "N/A", price: 2.50, description: "Durable pencil sharpener for all pencil types." }
  ];

  await WritingSupply.insertMany(writingSupplies);
  console.log(`Seeded ${writingSupplies.length} writing supplies`);
}

// Seed other items data
async function seedOther() {
  console.log('Seeding other items...');
  
  const otherItems = [
    { id: 301, title: "Casio Scientific Calculator", category: "Calculators", type: "Calculators", price: 69.99, description: "Advanced scientific calculator with multiple functions for engineering and science courses." },
    { id: 302, title: "30cm Ruler Set", category: "Rulers", type: "Rulers", price: 4.50, description: "Set of 30cm rulers in different materials and colors." },
    { id: 303, title: "A4 Folder with Pockets", category: "Folders & Files", type: "Folders & Files", price: 7.99, description: "A4 folder with multiple pockets for organizing documents." },
    { id: 304, title: "3-Ring Binder", category: "Binders", type: "Binders", price: 12.75, description: "Durable 3-ring binder for organizing course materials." },
    { id: 305, title: "Desktop Stapler", category: "Staplers", type: "Staplers", price: 15.50, description: "Heavy-duty desktop stapler for office and study use." },
    { id: 306, title: "Safety Scissors Set", category: "Scissors", type: "Scissors", price: 8.99, description: "Set of safety scissors in different sizes for various tasks." },
    { id: 307, title: "White Glue Bottle", category: "Glue", type: "Glue", price: 3.25, description: "White glue bottle for arts and crafts projects." }
  ];

  await Other.insertMany(otherItems);
  console.log(`Seeded ${otherItems.length} other items`);
}

// Main seeding function
async function seedDatabase() {
  try {
    await connectDB();
    await clearData();
    await seedCourseBooks();
    await seedNotebooks();
    await seedWritingSupplies();
    await seedOther();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding script
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
