import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";
export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch(field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters long';
        } else if (!validateName(value)) {
          newErrors.name = 'Name can only contain letters, spaces, hyphens and apostrophes';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        } else if (!validatePassword(value)) {
          newErrors.password = 'Password must include uppercase, lowercase, number and special character (@$!%*?&)';
        } else {
          delete newErrors.password;
        }
        
        if (touched.confirmPassword && formData.confirmPassword) {
          if (value !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else {
            delete newErrors.confirmPassword;
          }
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== value) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens and apostrophes';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, number and special character (@$!%*?&)';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Registration submitted:', formData);
      alert('Registration successful! Check console for details.');
    }
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    
    const levels = [
      { text: 'Weak', color: 'bg-red-500' },
      { text: 'Fair', color: 'bg-orange-500' },
      { text: 'Good', color: 'bg-yellow-500' },
      { text: 'Strong', color: 'bg-green-500' },
      { text: 'Very Strong', color: 'bg-green-600' }
    ];
    
    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
        
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Register Now</p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                className={`w-full pl-10 pr-4 py-3 border ${
                  touched.name && errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  touched.name && errors.name ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                } focus:border-transparent transition`}
                placeholder="John Doe"
              />
            </div>
            {touched.name && errors.name && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={`w-full pl-10 pr-4 py-3 border ${
                  touched.email && errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  touched.email && errors.email ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                } focus:border-transparent transition`}
                placeholder="you@example.com"
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                className={`w-full pl-10 pr-12 py-3 border ${
                  touched.password && errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  touched.password && errors.password ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                } focus:border-transparent transition`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.password}
              </p>
            )}
            
            {formData.password && !errors.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Password strength:</span>
                  <span className={`text-xs font-medium ${
                    strength.strength <= 1 ? 'text-red-600' :
                    strength.strength <= 2 ? 'text-orange-600' :
                    strength.strength <= 3 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {strength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${strength.color}`}
                    style={{ width: `${(strength.strength / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                className={`w-full pl-10 pr-12 py-3 border ${
                  touched.confirmPassword && errors.confirmPassword ? 'border-red-500 bg-red-50' :
                  touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500 bg-green-50' :
                  'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  touched.confirmPassword && errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                } focus:border-transparent transition`}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.confirmPassword}
              </p>
            )}
            {touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Passwords match
              </p>
            )}
          </div>

          

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition transform hover:scale-105"
          >
            Create Account
          </button>
        </div>

        


        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
         <Link
  to="/login"
  className="text-indigo-600 hover:text-indigo-700 font-medium"
>
  Log in 
</Link>
        </p>
      </div>
    </div>
  );
}