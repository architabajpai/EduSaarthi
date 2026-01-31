// src/lib/auth.ts - USES WORKING 'stats' collection
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getCollection } from './mongodb'; // Your existing function

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function loginUser(email: string, password: string) {
  try {
    const collections = await getCollection();
    
    // ✅ USE 'stats' collection (already working in your app!)
    const usersCollection = collections.login;
    
    console.log('🔍 Looking for:', email);
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found:', email);
      return null;
    }

    console.log('👤 Found:', user.name || user.email);

    // ✅ YOUR HASH - 123456 works
    const isValid = await bcrypt.compare(password, user.password);
    console.log('🔐 Password valid:', isValid);

    if (!isValid) {
      console.log('❌ Wrong password');
      return null;
    }

    const token = jwt.sign(
      { id: user.userId || user.id || email, email, role: user.role || 'teacher' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ LOGIN SUCCESS');
    return {
      id: user.userId || user.id || email,
      email: user.email,
      name: user.name || user.email,
      organization: user.organization || 'School',
      role: user.role || 'teacher',
      token
    };

  } catch (error) {
    console.error('💥 Login error:', error);
    return null;
  }
}

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return { id: decoded.id, email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}

