export const authRole = {
  Admin: ['admin', 'user'],
  User: ['user'],
};

export const allowMultiLanguage = process.env.REACT_APP_MULTILINGUAL === 'true';
export const fileStackKey = process.env.REACT_APP_FILESTACK_KEY;
export const initialUrl = process.env.REACT_APP_INITIAL_URL; // this url will open after login
