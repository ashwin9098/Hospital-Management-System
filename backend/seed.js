import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mongoUri = 'mongodb://127.0.0.1:27017/prescripto';

const doctors = [
    {
        name: "Dr. Sarah Johnson",
        email: "sarah@example.com",
        password: "doctor123",
        image: "doc1.png",
        speciality: "General physician",
        degree: "MBBS",
        experience: "10 years",
        about: "Experienced general physician specializing in preventive care and common ailments.",
        available: true,
        fees: 500,
        address: { line1: "123 Medical Center", line2: "New York, NY" },
        date: Date.now()
    },
    {
        name: "Dr. Michael Chen",
        email: "michael@example.com",
        password: "doctor123",
        image: "doc2.png",
        speciality: "Dermatologist",
        degree: "MD - Dermatology",
        experience: "8 years",
        about: "Specialist in skin conditions, acne treatment, and cosmetic dermatology.",
        available: true,
        fees: 800,
        address: { line1: "456 Skin Clinic", line2: "Los Angeles, CA" },
        date: Date.now()
    },
    {
        name: "Dr. Emily Davis",
        email: "emily@example.com",
        password: "doctor123",
        image: "doc3.png",
        speciality: "Gynecologist",
        degree: "MD - OB/GYN",
        experience: "12 years",
        about: "Women's health specialist providing comprehensive gynecological care.",
        available: true,
        fees: 700,
        address: { line1: "789 Women's Health", line2: "Chicago, IL" },
        date: Date.now()
    },
    {
        name: "Dr. James Wilson",
        email: "james@example.com",
        password: "doctor123",
        image: "doc4.png",
        speciality: "Neurologist",
        degree: "MD - Neurology",
        experience: "15 years",
        about: "Expert in treating neurological disorders and brain health.",
        available: true,
        fees: 1000,
        address: { line1: "321 Neuro Center", line2: "Houston, TX" },
        date: Date.now()
    },
    {
        name: "Dr. Lisa Martinez",
        email: "lisa@example.com",
        password: "doctor123",
        image: "doc5.png",
        speciality: "Pediatricians",
        degree: "MD - Pediatrics",
        experience: "7 years",
        about: "Caring for children from infancy to adolescence with gentle approach.",
        available: true,
        fees: 600,
        address: { line1: "654 Kids Care", line2: "Phoenix, AZ" },
        date: Date.now()
    },
    {
        name: "Dr. Robert Brown",
        email: "robert@example.com",
        password: "doctor123",
        image: "doc6.png",
        speciality: "Gastroenterologist",
        degree: "MD - Gastroenterology",
        experience: "11 years",
        about: "Specialist in digestive system disorders and liver diseases.",
        available: true,
        fees: 900,
        address: { line1: "987 GI Center", line2: "Philadelphia, PA" },
        date: Date.now()
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");

        const doctorSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            image: String,
            speciality: String,
            degree: String,
            experience: String,
            about: String,
            available: Boolean,
            fees: Number,
            slots_booked: Object,
            address: Object,
            date: Number
        }, { minimize: false });

        const Doctor = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

        // Clear existing doctors
        await Doctor.deleteMany({});
        console.log("Cleared existing doctors");

        // Hash passwords and add doctors
        for (const doctor of doctors) {
            const hashedPassword = await bcrypt.hash(doctor.password, 10);
            doctor.password = hashedPassword;
        }

        await Doctor.insertMany(doctors);
        console.log("Successfully seeded doctors!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
