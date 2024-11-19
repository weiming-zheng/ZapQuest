import React, { useState } from 'react';
import ParentLogin from './ParentLogin';
import ChildLogin from './ChildLogin';

function LoginPage() {
  const [isParent, setIsParent] = useState(true);

  const handleParentLogin = () => setIsParent(true);
  const handleChildLogin = () => setIsParent(false);

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <button onClick={handleParentLogin}>Parent Login</button>
        <button onClick={handleChildLogin}>Child Login</button>
      </div>
      <div>
        {isParent ? <ParentLogin /> : <ChildLogin />}
      </div>
    </div>
  );
}

export default LoginPage;