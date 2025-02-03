// pages/api/protectedRoute.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../lib/auth';

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  return res.status(200).json({ message: 'Protected content', user: decoded });
};

export default protectedRoute;
