import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [addFriend, setaddFriend] = useState(false);

  function handleAddFriend(e) {
    e.preventDefault();
    setaddFriend((addFriend) => !addFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendLists />
        {/* conditional rendering */}
        {addFriend && <Form />}
        <Button onClick={handleAddFriend}>
          {addFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendLists() {
  const friends = initialFriends;
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friends friend={friend} key={friend.id} />
        ))}
      </ul>
    </div>
  );
}

function Friends({ friend }) {
  return (
    <div className="friends">
      <li>
        <img src={friend.image} alt={friend.name}></img>
        <h3>{friend.name}</h3>
        <button style={{ background: "yellow" }}>Select</button>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {friend.balance} 💸
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes {friend.balance} 💸 to you
          </p>
        )}

        {friend.balance === 0 && (
          <p style={{ color: "skyblue" }}>
            {friend.name} and you owe nothing to each other
          </p>
        )}
      </li>
    </div>
  );
}

function Form() {
  const [name, setname] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newFriend = {
      name,
      balance: 0,
      id: crypto.randomUUID(),
    };
  }

  return (
    <form className="form-add-friend">
      <label>Friend's Name</label>
      <input
        class="input-field"
        type="text"
        placeholder="Name:"
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split bill with X</h2>

      <label>Bill Value 💲</label>
      <input type="number"></input>

      <label>Your Expense</label>
      <input type="number"></input>

      <label>X's Expense</label>
      <input type="number" disabled></input>

      <label>Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
