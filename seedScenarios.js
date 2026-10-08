// seedScenarios.js
// Run this once with: node seedScenarios.js
// Populates the "scenarios" collection used by the Scam or Fake? quiz module.

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const scenarioSchema = new mongoose.Schema({
  storyText: String,
  isReal: Boolean,
  category: String,
  source: String, // "user_reported" or "external_news"
  realDetails: {
    location: String,
    date: String,
    fullExplanation: String
  }
});

const Scenario = mongoose.model('Scenario', scenarioSchema);

const scenarios = [
  {
    storyText: "A user received a call from someone claiming to be a bank official, asking to share the OTP received on their phone to 'verify a suspicious transaction'.",
    isReal: true,
    category: "otp_scam",
    source: "user_reported",
    realDetails: {
      location: "Chennai, Tamil Nadu",
      date: "2024",
      fullExplanation: "The user lost 45,000 rupees after sharing the OTP during a fake bank verification call."
    }
  },
  {
    storyText: "A retired professor received a video call from someone with his son's exact face and voice, asking him to transfer money urgently for a hospital deposit abroad.",
    isReal: true,
    category: "deepfake_scam",
    source: "external_news",
    realDetails: {
      location: "Hong Kong",
      date: "2024",
      fullExplanation: "Scammers used AI deepfake video and voice cloning to impersonate a family member and pressure the victim into an urgent transfer."
    }
  },
  {
    storyText: "A user received an email from their electricity board's official-looking domain, with a correctly formatted bill and consumer number, saying the account would be disconnected in two hours unless the pending balance was paid through the attached link.",
    isReal: true,
    category: "phishing",
    source: "user_reported",
    realDetails: {
      location: "Coimbatore, Tamil Nadu",
      date: "2025",
      fullExplanation: "The bill looked genuine because scammers copied the board's actual template. The link led to a fake payment gateway that captured card details."
    }
  },
  {
    storyText: "A college student was offered a work-from-home data entry job that paid 2,000 rupees per day, but had to pay a 500 rupee 'security deposit' before starting.",
    isReal: true,
    category: "fake_job",
    source: "user_reported",
    realDetails: {
      location: "Bengaluru, Karnataka",
      date: "2025",
      fullExplanation: "The company disappeared after collecting deposits from over 200 students; no such job ever existed."
    }
  },
  {
    storyText: "A shopkeeper received a WhatsApp message from a 'customer' with a screenshot of a UPI payment confirmation for 5,000 rupees, but the money never actually arrived in the shopkeeper's account.",
    isReal: true,
    category: "upi_fraud",
    source: "user_reported",
    realDetails: {
      location: "Hyderabad, Telangana",
      date: "2025",
      fullExplanation: "Fake payment screenshot scams have become common; the shopkeeper handed over goods before verifying the transaction actually reflected in the bank account."
    }
  },
  {
    storyText: "A man received a letter claiming he had won a foreign lottery worth 50 lakh rupees, and just needed to pay a small 'processing fee' to claim it.",
    isReal: false,
    category: "lottery_scam",
    source: "external_news",
    realDetails: {
      location: "N/A",
      date: "N/A",
      fullExplanation: "This specific letter was fabricated for this quiz. However, lottery scams asking for upfront fees are extremely common and always fake — never enter a lottery you didn't buy a ticket for."
    }
  },
  {
    storyText: "A woman got a call from someone claiming to be from the income tax department, saying she owed 2 lakh rupees in unpaid taxes and would be arrested within the hour unless she paid immediately via gift cards.",
    isReal: false,
    category: "fake_call",
    source: "external_news",
    realDetails: {
      location: "N/A",
      date: "N/A",
      fullExplanation: "This exact scenario is fabricated for the quiz, but the general pattern (tax officials demanding gift card payments) is a well-known scam tactic worldwide — real government agencies never ask for payment via gift cards."
    }
  },
  {
    storyText: "A freelance designer was hired for a logo project through a networking app, paid 60% upfront, but the client vanished after receiving the first draft.",
    isReal: true,
    category: "fake_call",
    source: "user_reported",
    realDetails: {
      location: "Pune, Maharashtra",
      date: "2025",
      fullExplanation: "The client's profile and payment account were both fake, created just for this scam and deleted immediately after."
    }
  },
  {
    storyText: "An elderly man received a phone call from someone claiming his grandson was in jail after a car accident and needed 20,000 rupees immediately for bail, and was told not to tell anyone in the family.",
    isReal: true,
    category: "otp_scam",
    source: "external_news",
    realDetails: {
      location: "Delhi",
      date: "2024",
      fullExplanation: "Known as the 'grandparent scam', it relies on panic and secrecy to prevent the victim from verifying the story with family before sending money."
    }
  },
  {
    storyText: "A farmer received an SMS claiming to be from the agriculture department, saying he was eligible for a government subsidy of 25,000 rupees and just needed to click a link and enter his bank account details to receive it.",
    isReal: true,
    category: "phishing",
    source: "user_reported",
    realDetails: {
      location: "Nagpur, Maharashtra",
      date: "2025",
      fullExplanation: "The link led to a fake banking portal that captured login credentials; government subsidy schemes never ask for bank details via SMS links."
    }
  },
  {
    storyText: "A user matched with someone on a dating app, and after a few weeks of chatting, the match claimed to be a doctor working overseas and asked for 80,000 rupees to cover a medical emergency, promising to pay it back after meeting in person.",
    isReal: true,
    category: "other",
    source: "external_news",
    realDetails: {
      location: "Mumbai, Maharashtra",
      date: "2024",
      fullExplanation: "This is a classic 'romance scam' pattern — the scammer never actually met the victim and disappeared after receiving the money."
    }
  },
  {
    storyText: "A user received a call saying their SIM card would be deactivated in 24 hours due to KYC issues, and had to press specific keys on their phone to 'verify' it, which secretly forwarded all their calls to another number.",
    isReal: true,
    category: "otp_scam",
    source: "external_news",
    realDetails: {
      location: "Kolkata, West Bengal",
      date: "2024",
      fullExplanation: "This is a real SIM-swap style scam using call forwarding codes; entering the code redirected the victim's OTP calls to the scammer's phone, enabling bank fraud."
    }
  },
  {
    storyText: "A homemaker received a message saying she'd been selected for a 'mystery shopper' program and needed to buy gift cards worth 10,000 rupees and send back the codes as part of a 'review task', with a promise of reimbursement plus payment.",
    isReal: false,
    category: "other",
    source: "external_news",
    realDetails: {
      location: "N/A",
      date: "N/A",
      fullExplanation: "This specific case is fabricated, but 'mystery shopper' gift card scams are a widely reported real-world pattern — legitimate mystery shopping programs never ask you to buy gift cards upfront."
    }
  },
  {
    storyText: "A small business owner received a call from someone claiming to be from a well-known courier company, saying a parcel in his name contained illegal items and he needed to pay a 'customs clearance fee' immediately to avoid police action.",
    isReal: true,
    category: "fake_call",
    source: "user_reported",
    realDetails: {
      location: "Ahmedabad, Gujarat",
      date: "2025",
      fullExplanation: "Known as the 'digital arrest' or 'courier scam', it uses fear of legal trouble to pressure victims into paying immediately without verifying the claim."
    }
  },
  {
    storyText: "A teacher received an email that looked exactly like it came from her school's HR department, asking her to log in through a link to 'confirm her salary account details' for the month.",
    isReal: true,
    category: "phishing",
    source: "user_reported",
    realDetails: {
      location: "Lucknow, Uttar Pradesh",
      date: "2025",
      fullExplanation: "The link led to a fake login page designed to steal her email and banking credentials; the real HR department never sent that email."
    }
  }
];

async function seedScenarios() {
  await Scenario.deleteMany({});
  const inserted = await Scenario.insertMany(scenarios);
  console.log(`Inserted ${inserted.length} scenarios`);
  mongoose.connection.close();
  console.log("Scenario seeding complete.");
}

seedScenarios().catch(err => {
  console.error("Scenario seeding failed:", err);
  mongoose.connection.close();
});