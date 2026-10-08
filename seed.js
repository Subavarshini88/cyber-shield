// seed.js
// Run this once with: node seed.js
// Populates the Cyber Shield database with many demo users and complaints
// so the community board and personalized risk warning look realistic.

require('dotenv').config();
const mongoose = require('mongoose');

// ---------- Connect to MongoDB (uses the same connection string as server.js) ----------
mongoose.connect(process.env.MONGO_URI);

// ---------- Schemas ----------
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  age: Number,
  occupation: String,
  state: String
});

const complaintSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  description: String,
  state: String,
  occupationTargeted: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Complaint = mongoose.model('Complaint', complaintSchema);

// ---------- Helper data pools ----------
const states = ["Tamil Nadu", "Kerala", "Karnataka", "Maharashtra", "Telangana", "Delhi", "West Bengal", "Gujarat",
  "Andhra Pradesh", "Punjab", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Bihar", "Odisha",
  "Assam", "Haryana", "Chhattisgarh", "Jharkhand", "Goa"];
const occupations = ["student", "employee", "business owner", "retired", "homemaker", "freelancer",
  "government employee", "daily wage worker", "farmer", "healthcare worker", "teacher",
  "delivery agent", "shop owner", "unemployed", "self-employed professional"];
const firstNames = ["Arjun", "Priya", "Ravi", "Divya", "Karthik", "Meena", "Suresh", "Anitha", "Vignesh", "Lakshmi",
  "Rahul", "Sneha", "Manoj", "Kavya", "Deepak", "Pooja", "Naveen", "Swathi", "Ajay", "Nithya",
  "Vijay", "Harini", "Sanjay", "Preethi", "Arun", "Roshni", "Prakash", "Bhavya", "Gokul", "Shalini",
  "Amit", "Kiran", "Farhan", "Zoya", "Ramesh", "Sunita", "Vikram", "Anjali", "Rohan", "Neha",
  "Sameer", "Pallavi", "Rajesh", "Geetha", "Abhishek", "Tanvi", "Mahesh", "Ishita", "Balaji", "Kalyani",
  "Yusuf", "Ritu", "Chandran", "Aparna", "Dinesh", "Fathima", "Ganesh", "Madhuri", "Nikhil", "Reshma"];

const complaintTemplates = [
  { category: "fake_job", occupationTargeted: "student",
    description: "Received a fake internship offer asking for a registration fee via UPI." },
  { category: "fake_job", occupationTargeted: "student",
    description: "Got a job offer letter from a fake company asking for a 'training deposit' before joining." },
  { category: "upi_fraud", occupationTargeted: "employee",
    description: "Lost money after scanning a fake QR code shared by a buyer on an online marketplace." },
  { category: "upi_fraud", occupationTargeted: "business owner",
    description: "Received a fake payment confirmation screenshot from a customer, but no money was received." },
  { category: "otp_scam", occupationTargeted: "retired",
    description: "Received a call claiming to be from the bank, asking to share the OTP to 'verify' a transaction." },
  { category: "otp_scam", occupationTargeted: "retired",
    description: "Someone posing as a bank manager asked for OTP to 'reactivate' a blocked account." },
  { category: "phishing", occupationTargeted: "employee",
    description: "Received an email pretending to be from HR asking to reset password through a suspicious link." },
  { category: "phishing", occupationTargeted: "homemaker",
    description: "Got a message claiming a lottery win, asking for bank details to transfer the prize money." },
  { category: "fake_call", occupationTargeted: "freelancer",
    description: "Received a call offering a fake project payment, asking to pay 'processing charges' first." },
  { category: "other", occupationTargeted: "business owner",
    description: "Received a fake invoice demanding payment for services never ordered." },
  { category: "otp_scam", occupationTargeted: "government employee",
    description: "Received a call claiming to be from the pension office, asking for OTP to 'update records'." },
  { category: "fake_job", occupationTargeted: "daily wage worker",
    description: "Promised a factory job abroad after paying a 'visa processing fee' that turned out to be fake." },
  { category: "phishing", occupationTargeted: "farmer",
    description: "Received an SMS about a fake government subsidy scheme asking to click a link and enter bank details." },
  { category: "fake_call", occupationTargeted: "healthcare worker",
    description: "Got a call about a fake medical equipment order requiring an advance payment." },
  { category: "phishing", occupationTargeted: "teacher",
    description: "Received a fake email about a 'salary revision' asking to log in through a suspicious portal link." },
  { category: "upi_fraud", occupationTargeted: "delivery agent",
    description: "Customer sent a fake payment screenshot for a cash-on-delivery order and vanished." },
  { category: "fake_job", occupationTargeted: "unemployed",
    description: "Asked to pay a 'registration fee' for a work-from-home data entry job that never existed." },
  { category: "otp_scam", occupationTargeted: "self-employed professional",
    description: "Received a call claiming a business loan was pre-approved, asking for OTP to 'process' it." },
  { category: "other", occupationTargeted: "shop owner",
    description: "Received fake currency while accepting cash payment from an unknown customer." }
];

async function seed() {
  await User.deleteMany({});
  await Complaint.deleteMany({});

  const users = [];
  for (let i = 0; i < firstNames.length; i++) {
    users.push({
      name: firstNames[i],
      email: `${firstNames[i].toLowerCase()}${i}@example.com`,
      passwordHash: "dummyhashforseeddata",
      age: 18 + Math.floor(Math.random() * 50),
      occupation: occupations[Math.floor(Math.random() * occupations.length)],
      state: states[Math.floor(Math.random() * states.length)]
    });
  }

  const insertedUsers = await User.insertMany(users);
  console.log(`Inserted ${insertedUsers.length} users`);

  const complaints = [];
  for (let i = 0; i < 150; i++) {
    const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
    const template = complaintTemplates[Math.floor(Math.random() * complaintTemplates.length)];

    complaints.push({
      reportedBy: randomUser._id,
      category: template.category,
      description: template.description,
      state: randomUser.state,
      occupationTargeted: template.occupationTargeted,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
    });
  }

  const insertedComplaints = await Complaint.insertMany(complaints);
  console.log(`Inserted ${insertedComplaints.length} complaints`);

  mongoose.connection.close();
  console.log("Seeding complete.");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  mongoose.connection.close();
});