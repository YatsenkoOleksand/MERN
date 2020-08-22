import React from "react";

import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "1",
      name: "Alex",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      places: 3
    }
  ];

  return <UserList items={USERS} />;
};

export default Users;
