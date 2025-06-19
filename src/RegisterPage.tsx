import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 2. Send verification email
      await sendEmailVerification(userCredential.user);
      alert('Verification email sent. Please check your inbox before signing in.');

      // 3. Save user profile to Firestore
      await addDoc(collection(db, 'users'), {
        fullName: formData.fullName,
        email: formData.email,
        createdAt: new Date(),
      });

      // 4. Clear form
      setFormData({ fullName: '', email: '', password: '' });

      // 5. Redirect to Sign In (not student-form)
      navigate('/signin');
    } catch (error: any) {
      console.error('Error:', error.message);
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/signin" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
