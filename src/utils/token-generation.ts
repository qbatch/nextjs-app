import jwt from 'jsonwebtoken';

const GenerateAuthToken = async (userId: string): Promise<string> => {
  try {
    const token: string = jwt.sign({ _id: userId.toString() }, process.env.SECRET_KEY!, { expiresIn: '365d' });
    return token;
  } catch (error: any) {
    throw new Error(`Error generating auth token: ${error.message}`);
  }
};

export default GenerateAuthToken;
