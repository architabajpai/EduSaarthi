// seed-login-data.ts - NO ENV NEEDED
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

async function seedLoginData() {
  // 🔧 PASTE YOUR MONGODB_URI HERE DIRECTLY
  const uri = process.env.MONGODB_URI;
  
  console.log('🔗 Connecting to:', uri.startsWith('mongodb') ? '✅ Valid' : '❌ Fix URI');
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ MongoDB connected');
    
    const db = client.db('Shiksha');
    const collection = db.collection('login');
    
    // Clear old data
    await collection.deleteMany({});
    const password = '123456';
    const hash = await bcrypt.hash(password, 10)
    
    // 5 Indian teachers (password: 123456)
    const teachers = [
      {
        id: '1',
        email: 'teacher@school.com',
        password: hash, // 123456
        name: 'Sunita Kumari',
        organization: 'Govt Primary School Ashta',
        role: 'teacher',
        subjects: ['Maths', 'Hindi'],
        grade: '1-5',
        district: 'Sehore',
        createdAt: new Date()
      },
      {
        id: '2',
        email: 'principal@diet.org',
        password: hash,
        name: 'Dr. Anil Kumar',
        organization: 'DIET Jharkhand',
        role: 'principal',
        subjects: ['Administration'],
        grade: 'All',
        district: 'Ranchi',
        createdAt: new Date()
      },
      {
        id: '3',
        email: 'rajesh@school.gov.in',
        password: hash,
        name: 'Rajesh Sharma',
        organization: 'Sarvodaya Vidyalaya Bhopal',
        role: 'teacher',
        subjects: ['Science', 'Maths'],
        grade: '6-8',
        district: 'Bhopal',
        createdAt: new Date()
      }
    ];
    
    await collection.insertMany(teachers);
    console.log('✅ SUCCESS! 3 teachers added to login collection');
    console.log('📧 Login with:');
    console.log('   teacher@school.com / 123456');
    console.log('   principal@diet.org / 123456');
    console.log('   rajesh@school.gov.in / 123456');
    
  } catch (error: any) {
    console.error('❌ FAILED:', error.message);
    if (error.message.includes('authentication')) {
      console.log('🔧 Fix: Check username/password in URI');
    }
  } finally {
    await client.close();
  }
}

seedLoginData();

