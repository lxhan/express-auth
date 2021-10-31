import { Router } from 'express';
import { refreshSession, signIn, signOut, signUp } from '../controllers/auth';
import { auth, guest } from '../middleware';
import { signinSchema, signupSchema, validate } from '../validation';

const router = Router();

router.post('/signup', guest, async (req, res) => {
  try {
    await validate(signupSchema, req.body);

    const result = await signUp(req.body);
    refreshSession(req, result);

    return res.send({ message: 'Signed up' });
  } catch (err: any) {
    return res
      .status(err.status || 400)
      .send({ message: err.message || 'Bad request' });
  }
});

router.post('/signin', guest, async (req, res) => {
  try {
    await validate(signinSchema, req.body);

    const result = await signIn(req.body);
    refreshSession(req, result);

    return res.send({ message: 'Signed in' });
  } catch (err: any) {
    return res
      .status(err.status || 400)
      .send({ message: err.message || 'Bad request' });
  }
});

router.post('/signout', auth, async (req, res) => {
  try {
    await signOut(req, res);

    return res.send({ message: 'Signed out' });
  } catch (err: any) {
    return res
      .status(err.status || 400)
      .send({ message: err.message || 'Bad request' });
  }
});

export default router;
