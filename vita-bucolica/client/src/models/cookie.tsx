interface CookieI {
  result: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    tags: [string];
    id: [string];
    isCreator: boolean;
    _id: string;
  };
};

export default CookieI;
