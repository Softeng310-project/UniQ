import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "../models/Book";
import Notebook from "../models/Notebook";
import WritingSupply from "../models/WritingSupply";
import Other from "../models/Other";

// Load environment variables
dotenv.config();

// Global ID counter
let currentId = 1;

// Helper function to get next ID
function getNextId(): number {
    return currentId++;
}

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
        // Engineering
        { id: getNextId(), title: "SOFTENG310 Course Book", category: "Software Engineering", degree: "Bachelor of Engineering", major: "Software Engineering", year: 3, condition: "New", price: 67.67, description: "Essential textbook for Software Engineering 310 course covering advanced software development concepts." },
        { id: getNextId(), title: "COMPSCI101 Course Book", category: "Computer Science", degree: "Bachelor of Engineering", major: "Computer Systems Engineering", year: 1, condition: "Used", price: 45.50, description: "Introduction to Computer Science fundamentals and programming concepts." },
        { id: getNextId(), title: "MECHENG210 Course Book", category: "Mechanical Engineering", degree: "Bachelor of Engineering", major: "Mechanical Engineering", year: 2, condition: "New", price: 89.99, description: "Mechanical Engineering principles and design methodologies." },
        { id: getNextId(), title: "CIVILENG101 Structures", category: "Civil Engineering", degree: "Bachelor of Engineering", major: "Civil Engineering", year: 1, condition: "New", price: 78.50, description: "Introduction to structural engineering and civil construction." },
        { id: getNextId(), title: "ELECTENG202 Circuits", category: "Electrical Engineering", degree: "Bachelor of Engineering", major: "Electrical and Electronic Engineering", year: 2, condition: "Used", price: 65.99, description: "Electrical circuits and electronic systems fundamentals." },

        // Arts
        { id: getNextId(), title: "ENGLISH101 Literature", category: "English Literature", degree: "Bachelor of Arts", major: "English", year: 1, condition: "New", price: 55.00, description: "Comprehensive introduction to English literature and literary analysis." },
        { id: getNextId(), title: "HISTORY201 Modern History", category: "History", degree: "Bachelor of Arts", major: "History", year: 2, condition: "Used", price: 42.75, description: "In-depth study of modern historical events and their impact." },
        { id: getNextId(), title: "PHILOSOPHY301 Ethics", category: "Philosophy", degree: "Bachelor of Arts", major: "Philosophy", year: 3, condition: "New", price: 68.25, description: "Advanced study of ethical theories and moral philosophy." },
        { id: getNextId(), title: "POLITICS202 Political Theory", category: "Politics", degree: "Bachelor of Arts", major: "Politics", year: 2, condition: "Used", price: 48.99, description: "Study of political systems and theories." },
        { id: getNextId(), title: "SOCIOLOGY101 Introduction", category: "Sociology", degree: "Bachelor of Arts", major: "Sociology", year: 1, condition: "New", price: 52.50, description: "Introduction to sociological concepts and research methods." },

        // Business and Economics
        { id: getNextId(), title: "BUSINESS101 Principles", category: "Business Management", degree: "Bachelor of Commerce", major: "Management", year: 1, condition: "New", price: 72.50, description: "Fundamental principles of business operations and management." },
        { id: getNextId(), title: "ECONOMICS201 Microeconomics", category: "Economics", degree: "Bachelor of Commerce", major: "Economics", year: 2, condition: "Used", price: 58.99, description: "Detailed study of microeconomic principles and market behavior." },
        { id: getNextId(), title: "ACCOUNTING301 Advanced", category: "Accounting", degree: "Bachelor of Commerce", major: "Accounting", year: 3, condition: "New", price: 95.00, description: "Advanced accounting principles and financial reporting." },
        { id: getNextId(), title: "FINANCE202 Corporate Finance", category: "Finance", degree: "Bachelor of Commerce", major: "Finance", year: 2, condition: "Used", price: 82.75, description: "Corporate finance and investment analysis." },
        { id: getNextId(), title: "MARKETING101 Fundamentals", category: "Marketing", degree: "Bachelor of Commerce", major: "Marketing", year: 1, condition: "New", price: 65.50, description: "Marketing fundamentals and consumer behavior." },

        // Creative Arts and Industries
        { id: getNextId(), title: "DESIGN101 Visual Design", category: "Graphic Design", degree: "Bachelor of Creative Arts", major: "Design", year: 1, condition: "New", price: 65.00, description: "Introduction to visual design principles and creative processes." },
        { id: getNextId(), title: "ARCHITECTURE201 Building Design", category: "Architecture", degree: "Bachelor of Creative Arts", major: "Architecture", year: 2, condition: "Used", price: 88.75, description: "Principles of architectural design and building construction." },
        { id: getNextId(), title: "MUSIC102 Music Theory", category: "Music", degree: "Bachelor of Creative Arts", major: "Music", year: 1, condition: "New", price: 58.99, description: "Fundamentals of music theory and composition." },
        { id: getNextId(), title: "FILM201 Cinematography", category: "Film", degree: "Bachelor of Creative Arts", major: "Film", year: 2, condition: "Used", price: 72.50, description: "Cinematography techniques and visual storytelling." },

        // Education and Social Work
        { id: getNextId(), title: "EDUCATION101 Teaching Methods", category: "Education", degree: "Bachelor of Education", major: "Primary Education", year: 1, condition: "New", price: 62.50, description: "Fundamental teaching methods and educational psychology." },
        { id: getNextId(), title: "EDUCATION202 Curriculum Design", category: "Education", degree: "Bachelor of Education", major: "Secondary Education", year: 2, condition: "Used", price: 56.75, description: "Curriculum development and instructional design." },
        { id: getNextId(), title: "SOCIALWORK201 Social Policy", category: "Social Work", degree: "Bachelor of Social Work", major: "Social Work", year: 2, condition: "Used", price: 54.25, description: "Study of social policies and their impact on communities." },
        { id: getNextId(), title: "SOCIALWORK301 Practice", category: "Social Work", degree: "Bachelor of Social Work", major: "Social Work", year: 3, condition: "New", price: 68.99, description: "Advanced social work practice and intervention methods." },

        // Law
        { id: getNextId(), title: "LAW101 Introduction to Law", category: "Constitutional Law", degree: "Bachelor of Laws", major: "Law", year: 1, condition: "New", price: 78.99, description: "Introduction to legal principles and constitutional law." },
        { id: getNextId(), title: "LAW201 Criminal Law", category: "Criminal Law", degree: "Bachelor of Laws", major: "Law", year: 2, condition: "Used", price: 85.50, description: "Study of criminal law and legal procedures." },
        { id: getNextId(), title: "LAW301 Contract Law", category: "Contract Law", degree: "Bachelor of Laws", major: "Law", year: 3, condition: "Used", price: 92.50, description: "Advanced study of contract law and legal obligations." },
        { id: getNextId(), title: "LAW302 Property Law", category: "Property Law", degree: "Bachelor of Laws", major: "Law", year: 3, condition: "New", price: 88.75, description: "Property law and real estate legal principles." },

        // Medicine & Health Science
        { id: getNextId(), title: "MEDICINE101 Human Anatomy", category: "Anatomy", degree: "Bachelor of Medicine", major: "Medicine", year: 1, condition: "New", price: 125.00, description: "Comprehensive study of human anatomy and physiology." },
        { id: getNextId(), title: "MEDICINE202 Pathology", category: "Pathology", degree: "Bachelor of Medicine", major: "Medicine", year: 2, condition: "Used", price: 115.50, description: "Study of disease processes and medical pathology." },
        { id: getNextId(), title: "NURSING201 Clinical Practice", category: "Nursing", degree: "Bachelor of Health Science", major: "Nursing", year: 2, condition: "Used", price: 75.25, description: "Clinical practice guidelines and patient care principles." },
        { id: getNextId(), title: "PHARMACY101 Pharmacology", category: "Pharmacy", degree: "Bachelor of Health Science", major: "Pharmacy", year: 1, condition: "New", price: 98.99, description: "Introduction to pharmacology and drug interactions." },

        // Science
        { id: getNextId(), title: "BIOLOGY101 General Biology", category: "Biology", degree: "Bachelor of Science", major: "Biology", year: 1, condition: "New", price: 69.99, description: "Introduction to biological principles and life sciences." },
        { id: getNextId(), title: "BIOLOGY202 Genetics", category: "Biology", degree: "Bachelor of Science", major: "Biology", year: 2, condition: "Used", price: 76.50, description: "Study of genetics and heredity." },
        { id: getNextId(), title: "CHEMISTRY201 Organic Chemistry", category: "Chemistry", degree: "Bachelor of Science", major: "Chemistry", year: 2, condition: "Used", price: 82.50, description: "Study of organic chemistry and molecular structures." },
        { id: getNextId(), title: "CHEMISTRY301 Physical Chemistry", category: "Chemistry", degree: "Bachelor of Science", major: "Chemistry", year: 3, condition: "New", price: 89.99, description: "Advanced physical chemistry and thermodynamics." },
        { id: getNextId(), title: "PHYSICS301 Quantum Physics", category: "Physics", degree: "Bachelor of Science", major: "Physics", year: 3, condition: "New", price: 98.75, description: "Advanced study of quantum mechanics and particle physics." },
        { id: getNextId(), title: "PHYSICS101 Mechanics", category: "Physics", degree: "Bachelor of Science", major: "Physics", year: 1, condition: "Used", price: 72.50, description: "Introduction to classical mechanics and motion." },
        { id: getNextId(), title: "MATH201 Calculus II", category: "Mathematics", degree: "Bachelor of Science", major: "Mathematics", year: 2, condition: "New", price: 68.99, description: "Advanced calculus and mathematical analysis." },
        { id: getNextId(), title: "STATS101 Statistics", category: "Statistics", degree: "Bachelor of Science", major: "Statistics", year: 1, condition: "Used", price: 62.75, description: "Introduction to statistical methods and data analysis." },
        { id: getNextId(), title: "ENVIRO202 Environmental Science", category: "Environmental Science", degree: "Bachelor of Science", major: "Environmental Science", year: 2, condition: "New", price: 74.50, description: "Study of environmental systems and sustainability." }
    ];

    await Book.insertMany(courseBooks);
    console.log(`Seeded ${courseBooks.length} course books (IDs: 1-${courseBooks.length})`);
}

// Seed notebooks data
async function seedNotebooks() {
    console.log('Seeding notebooks...');
    const startId = currentId;

    const notebooks = [
        // A4 Pads
        { id: getNextId(), title: "Blue A4 Spiral Pad", type: "A4 Pads", cover_type: "Soft Cover", page_style: "Lined", price: 8.50, description: "Blue spiral-bound A4 pad with lined pages for everyday use." },
        { id: getNextId(), title: "White A4 Blank Pad", type: "A4 Pads", cover_type: "Soft Cover", page_style: "Blank", price: 7.99, description: "White A4 pad with blank pages for drawing and writing." },
        { id: getNextId(), title: "Green A4 Graph Pad", type: "A4 Pads", cover_type: "Soft Cover", page_style: "Grid", price: 9.25, description: "Green A4 pad with graph paper for technical drawings." },

        // A5 Pads
        { id: getNextId(), title: "Yellow A5 Softcover", type: "A5 Pads", cover_type: "Soft Cover", page_style: "Lined", price: 6.99, description: "Bright yellow A5 softcover notebook with lined pages." },
        { id: getNextId(), title: "Red A5 Notepad", type: "A5 Pads", cover_type: "Soft Cover", page_style: "Lined", price: 6.50, description: "Compact red A5 notepad perfect for quick notes." },

        // Dot Grid
        { id: getNextId(), title: "Green Dot Grid Journal", type: "Dot Grid", cover_type: "Soft Cover", page_style: "Dot Grid", price: 15.75, description: "Green dot grid journal perfect for bullet journaling and creative note-taking." },
        { id: getNextId(), title: "Black Dot Grid Notebook", type: "Dot Grid", cover_type: "Hard Cover", page_style: "Dot Grid", price: 18.99, description: "Premium black dot grid notebook for planning and organization." },

        // Hardcover Notebooks
        { id: getNextId(), title: "Pink A5 Notebook Lined", type: "Hardcover Notebooks", cover_type: "Hard Cover", page_style: "Lined", price: 12.99, description: "Beautiful pink hardcover notebook with lined pages, perfect for note-taking." },
        { id: getNextId(), title: "Black Hardcover Notebook", type: "Hardcover Notebooks", cover_type: "Hard Cover", page_style: "Blank", price: 18.99, description: "Professional black hardcover notebook with blank pages for sketches and notes." },
        { id: getNextId(), title: "Blue Leather Notebook", type: "Hardcover Notebooks", cover_type: "Hard Cover", page_style: "Lined", price: 24.99, description: "Elegant blue leather-bound notebook for professional use." },

        // Softcover Notebooks
        { id: getNextId(), title: "Orange Softcover Journal", type: "Softcover Notebooks", cover_type: "Soft Cover", page_style: "Lined", price: 9.99, description: "Vibrant orange softcover journal for everyday writing." },
        { id: getNextId(), title: "Purple Softcover Notebook", type: "Softcover Notebooks", cover_type: "Soft Cover", page_style: "Blank", price: 10.50, description: "Purple softcover notebook with blank pages." },

        // Sticky Notes
        { id: getNextId(), title: "Colorful Sticky Notes Set", type: "Sticky Notes", cover_type: "N/A", page_style: "N/A", price: 4.25, description: "Set of colorful sticky notes in various sizes and colors." },
        { id: getNextId(), title: "Neon Sticky Notes Pack", type: "Sticky Notes", cover_type: "N/A", page_style: "N/A", price: 5.50, description: "Bright neon sticky notes for highlighting important information." },
        { id: getNextId(), title: "Pastel Sticky Notes Bundle", type: "Sticky Notes", cover_type: "N/A", page_style: "N/A", price: 6.75, description: "Soft pastel colored sticky notes for gentle reminders." },

        // Index Tabs
        { id: getNextId(), title: "Index Tabs Pack", type: "Index Tabs", cover_type: "N/A", page_style: "N/A", price: 3.50, description: "Pack of index tabs for organizing notebooks and documents." },
        { id: getNextId(), title: "Rainbow Index Tabs", type: "Index Tabs", cover_type: "N/A", page_style: "N/A", price: 4.99, description: "Colorful rainbow index tabs for easy categorization." }
    ];

    await Notebook.insertMany(notebooks);
    console.log(`Seeded ${notebooks.length} notebooks (IDs: ${startId}-${currentId - 1})`);
}

// Seed writing supplies data
async function seedWritingSupplies() {
    console.log('Seeding writing supplies...');
    const startId = currentId;

    const writingSupplies = [
        // Ballpoint Pens
        { id: getNextId(), title: "Premium Black Ballpoint Pen", category: "Pens", type: "Ballpoint", colour: "Black", ink_type: "Black Ink", price: 5.99, description: "Smooth-writing ballpoint pen with black ink, comfortable grip." },
        { id: getNextId(), title: "Blue Ballpoint Pen Pack", category: "Pens", type: "Ballpoint", colour: "Blue", ink_type: "Blue Ink", price: 7.50, description: "Pack of blue ballpoint pens for everyday writing." },
        { id: getNextId(), title: "Red Ballpoint Pen", category: "Pens", type: "Ballpoint", colour: "Red", ink_type: "Red Ink", price: 4.99, description: "Red ballpoint pen perfect for marking and corrections." },

        // Gel Pens
        { id: getNextId(), title: "Blue Gel Pen Set", category: "Pens", type: "Gel", colour: "Blue", ink_type: "Blue Ink", price: 8.50, description: "Set of blue gel pens with smooth writing experience." },
        { id: getNextId(), title: "Multi-Color Gel Pen Pack", category: "Pens", type: "Gel", colour: "Multi Coloured", ink_type: "Various", price: 12.99, description: "Vibrant multi-color gel pens for creative writing." },
        { id: getNextId(), title: "Black Gel Pen", category: "Pens", type: "Gel", colour: "Black", ink_type: "Black Ink", price: 6.50, description: "Premium black gel pen with smooth flow." },

        // Fountain Pens
        { id: getNextId(), title: "Fountain Pen with Gold Nib", category: "Pens", type: "Fountain", colour: "Black", ink_type: "Black Ink", price: 25.99, description: "Premium fountain pen with gold nib for elegant writing." },
        { id: getNextId(), title: "Blue Fountain Pen", category: "Pens", type: "Fountain", colour: "Blue", ink_type: "Blue Ink", price: 22.50, description: "Classic blue fountain pen for professional writing." },

        // Highlighters
        { id: getNextId(), title: "Yellow Highlighter Pack", category: "Highlighters", type: "Highlighters", colour: "Yellow", ink_type: "N/A", price: 6.75, description: "Pack of yellow highlighters for marking important text." },
        { id: getNextId(), title: "Multi-Color Highlighter Set", category: "Highlighters", type: "Highlighters", colour: "Multi Coloured", ink_type: "N/A", price: 9.99, description: "Set of highlighters in various colors." },
        { id: getNextId(), title: "Pink Highlighter", category: "Highlighters", type: "Highlighters", colour: "Pink", ink_type: "N/A", price: 5.50, description: "Bright pink highlighter for standout marking." },

        // Fineliners
        { id: getNextId(), title: "Fine Liner Set", category: "Fineliners", type: "Fineliners", colour: "Multi Coloured", ink_type: "Various", price: 12.99, description: "Set of fine liner pens in various colors for detailed work." },
        { id: getNextId(), title: "Black Fineliner Pack", category: "Fineliners", type: "Fineliners", colour: "Black", ink_type: "Black Ink", price: 10.50, description: "Pack of black fineliners for precise drawing and writing." },

        // Pencils
        { id: getNextId(), title: "Mechanical Pencil Set", category: "Pencils", type: "Pencils", colour: "Multi Coloured", ink_type: "N/A", price: 9.25, description: "Set of mechanical pencils with different lead sizes." },
        { id: getNextId(), title: "Wooden Pencil Pack", category: "Pencils", type: "Pencils", colour: "Natural Wood", ink_type: "N/A", price: 5.99, description: "Classic wooden pencils for drawing and writing." },
        { id: getNextId(), title: "Colored Pencil Set", category: "Pencils", type: "Pencils", colour: "Multi Coloured", ink_type: "N/A", price: 15.99, description: "Set of colored pencils for art and illustration." },

        // Erasers
        { id: getNextId(), title: "Pink Eraser Pack", category: "Erasers", type: "Erasers", colour: "Pink", ink_type: "N/A", price: 3.99, description: "Pack of pink erasers for clean erasing." },
        { id: getNextId(), title: "White Eraser", category: "Erasers", type: "Erasers", colour: "White", ink_type: "N/A", price: 2.50, description: "White eraser for precise corrections." },

        // Sharpeners
        { id: getNextId(), title: "Pencil Sharpener", category: "Sharpeners", type: "Sharpeners", colour: "Multi Coloured", ink_type: "N/A", price: 2.50, description: "Durable pencil sharpener for all pencil types." },
        { id: getNextId(), title: "Electric Sharpener", category: "Sharpeners", type: "Sharpeners", colour: "Black", ink_type: "N/A", price: 18.99, description: "Electric pencil sharpener for quick and easy sharpening." }
    ];

    await WritingSupply.insertMany(writingSupplies);
    console.log(`Seeded ${writingSupplies.length} writing supplies (IDs: ${startId}-${currentId - 1})`);
}

// Seed other items data
async function seedOther() {
    console.log('Seeding other items...');
    const startId = currentId;

    const otherItems = [
        // Calculators
        { id: getNextId(), title: "Casio Scientific Calculator", category: "Calculators", type: "Calculators", price: 69.99, description: "Advanced scientific calculator with multiple functions for engineering and science courses." },
        { id: getNextId(), title: "Basic Calculator", category: "Calculators", type: "Calculators", price: 15.50, description: "Simple calculator for everyday calculations." },
        { id: getNextId(), title: "Graphing Calculator", category: "Calculators", type: "Calculators", price: 125.00, description: "Advanced graphing calculator for mathematics and statistics." },

        // Rulers
        { id: getNextId(), title: "30cm Ruler Set", category: "Rulers", type: "Rulers", price: 4.50, description: "Set of 30cm rulers in different materials and colors." },
        { id: getNextId(), title: "Metal Ruler 15cm", category: "Rulers", type: "Rulers", price: 3.99, description: "Durable metal ruler for precise measurements." },
        { id: getNextId(), title: "Flexible Ruler", category: "Rulers", type: "Rulers", price: 5.50, description: "Flexible ruler for curved measurements." },

        // Folders & Files
        { id: getNextId(), title: "A4 Folder with Pockets", category: "Folders & Files", type: "Folders & Files", price: 7.99, description: "A4 folder with multiple pockets for organizing documents." },
        { id: getNextId(), title: "Plastic File Dividers", category: "Folders & Files", type: "Folders & Files", price: 6.50, description: "Set of plastic dividers for organizing files." },
        { id: getNextId(), title: "Document Organizer", category: "Folders & Files", type: "Folders & Files", price: 12.99, description: "Multi-compartment document organizer." },

        // Binders
        { id: getNextId(), title: "3-Ring Binder", category: "Binders", type: "Binders", price: 12.75, description: "Durable 3-ring binder for organizing course materials." },
        { id: getNextId(), title: "2-Ring Binder A4", category: "Binders", type: "Binders", price: 10.50, description: "A4 size 2-ring binder for documents." },
        { id: getNextId(), title: "Heavy Duty Binder", category: "Binders", type: "Binders", price: 16.99, description: "Heavy duty binder for large document collections." },

        // Staplers
        { id: getNextId(), title: "Desktop Stapler", category: "Staplers", type: "Staplers", price: 15.50, description: "Heavy-duty desktop stapler for office and study use." },
        { id: getNextId(), title: "Mini Stapler", category: "Staplers", type: "Staplers", price: 8.99, description: "Compact mini stapler for portability." },
        { id: getNextId(), title: "Electric Stapler", category: "Staplers", type: "Staplers", price: 35.00, description: "Automatic electric stapler for high-volume stapling." },

        // Scissors
        { id: getNextId(), title: "Safety Scissors Set", category: "Scissors", type: "Scissors", price: 8.99, description: "Set of safety scissors in different sizes for various tasks." },
        { id: getNextId(), title: "Professional Scissors", category: "Scissors", type: "Scissors", price: 12.50, description: "Sharp professional scissors for precision cutting." },

        // Glue
        { id: getNextId(), title: "White Glue Bottle", category: "Glue", type: "Glue", price: 3.25, description: "White glue bottle for arts and crafts projects." },
        { id: getNextId(), title: "Glue Stick Pack", category: "Glue", type: "Glue", price: 5.99, description: "Pack of glue sticks for paper crafts." },
        { id: getNextId(), title: "Super Glue", category: "Glue", type: "Glue", price: 4.50, description: "Strong adhesive super glue for various materials." }
    ];

    await Other.insertMany(otherItems);
    console.log(`Seeded ${otherItems.length} other items (IDs: ${startId}-${currentId - 1})`);
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
        console.log(`\n✅ Database seeding completed successfully!`);
        console.log(`📊 Total items seeded: ${currentId - 1}`);
        console.log(`\n💡 Next available ID: ${currentId}`);
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