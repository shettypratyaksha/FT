// import React, { useState } from "react";
// import "./styles.css";
// import { PieChart, Pie, Cell, Tooltip} from "recharts";
// import {
//   RadialBarChart,
//   RadialBar,
//   PolarAngleAxis,
//   Legend
// } from "recharts";

// import img1 from "./assets/1.jpg";
// import img2 from "./assets/2.jpg";
// import img7 from "./assets/7.jpg";

// export default function App() {
//   const [page, setPage] = useState("welcome");
//   const [initialBalance, setInitialBalance] = useState(null);


//   return (
//     <div className="app">
//       {page === "welcome" && <WelcomeSlides onNext={() => setPage("signup")} />}
//       {page === "signup" && <Signup onNext={() => setPage("baseCurrency")} />}
//       {page === "baseCurrency" && (
//         <BaseCurrency onNext={() => setPage("setAmount")} />
//       )}
//       {page === "setAmount" && (
//         <SetAmount
//           onNext={(amount) => {
//             setInitialBalance(amount);   
//             setPage("home");
//           }}
//         />
//       )}
//       {page === "home" && <Home initialBalance={initialBalance}/>}
//     </div>
//   );
// }

// function WelcomeSlides({ onNext }) {
//   const slides = [
//     { img: img1, text: "Welcome to Finance Tracker" },
//     { img: img2, text: "Track your expenses easily" },
//     { img: img7, text: "Let’s get started!" },
//   ];

//   const [index, setIndex] = useState(0);

//   const handleNext = () => {
//     if (index < slides.length - 1) {
//       setIndex(index + 1);
//     } else {
//       onNext();
//     }
//   };

//   return (
//     <div className="slides">
//       <img src={slides[index].img} alt={`Slide ${index + 1}`} width="300" />
//       <h1>{slides[index].text}</h1>
//       <button onClick={handleNext}>
//         {index < slides.length - 1 ? "Next" : "Get Started"}
//       </button>
//     </div>
//   );
// }

// function Signup({ onNext }) {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNext();
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-card" onSubmit={handleSubmit}>
//         <h2>Create Account</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"

//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account? <a href="#">Log in</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// function BaseCurrency({ onNext }) {
//   const [currency, setCurrency] = useState("INR");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNext();
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-card" onSubmit={handleSubmit}>
//         <h2>Select Your Base Currency</h2>
//         <select
//           value={currency}
//           onChange={(e) => setCurrency(e.target.value)}
//           required
//         >
//           <option value="INR">₹ Indian Rupee (INR)</option>
//           <option value="USD">$ US Dollar (USD)</option>
//           <option value="EUR">€ Euro (EUR)</option>
//           <option value="GBP">£ British Pound (GBP)</option>
//           <option value="JPY">¥ Japanese Yen (JPY)</option>
//         </select>
//         <button type="submit">Continue</button>
//       </form>
//     </div>
//   );
// }

// function SetAmount({ onNext }) {
//   const [amount, setAmount] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNext(parseFloat(amount));
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-card" onSubmit={handleSubmit}>
//         <h2>Set Initial Amount</h2>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//         <button type="submit">Go to Home</button>
//       </form>
//     </div>
//   );
// }


// function Home({ initialBalance }) {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(initialBalance || 0);
//   const [showInput, setShowInput] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [transactionDate, setTransactionDate] = useState(
//     new Date().toISOString().substr(0, 10)
//   );
//   const [filterMonth, setFilterMonth] = useState("");
//   const [darkMode, setDarkMode] = useState(false);

//   // Filtered transactions based on selected month
//   const filteredTransactions = filterMonth
//     ? transactions.filter((t) => t.date.startsWith(filterMonth))
//     : transactions;

//   // Income and expense sums
//   const income = filteredTransactions
//     .filter((t) => t.type === "income")
//     .reduce((sum, t) => sum + t.value, 0);

//   const expense = filteredTransactions
//     .filter((t) => t.type === "expense")
//     .reduce((sum, t) => sum + t.value, 0);

//   const data = [
//     { name: "Balance", value: balance },
//     { name: "Income", value: income },
//     { name: "Expense", value: expense },
//   ];

//   const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

//   const handleAdd = (type) => {
//     if (!amount) return;
//     const value = parseFloat(amount);
//     const newTransaction = {
//       type,
//       value,
//       id: Date.now(),
//       date: transactionDate,
//     };
//     setTransactions([newTransaction, ...transactions]);
//     setBalance(type === "income" ? balance + value : balance - value);
//     setAmount("");
//     setTransactionDate(new Date().toISOString().substr(0, 10));
//     setShowInput(null);
//   };

//   return (
//     <div className={`home-container ${darkMode ? "dark" : ""}`}>
//       {/* Dark/Light Mode */}
//       <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
//         {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//       </button>

//       {/* Total Balance */}
//       <div className="balance-card">
//         <h3>Total Balance</h3>
//         <p className="balance">₹ {balance}</p>
//       </div>

//       {/* Add Income/Expense Buttons */}
//       <div className="actions">
//         <button className="add-btn" onClick={() => setShowInput("income")}>
//           + Add Income
//         </button>
//         <button className="expense-btn" onClick={() => setShowInput("expense")}>
//           - Add Expense
//         </button>
//       </div>

//       {/* Month Filter */}
//       <div className="month-filter">
//         <label>Filter by Month: </label>
//         <input
//           type="month"
//           value={filterMonth}
//           onChange={(e) => setFilterMonth(e.target.value)}
//         />
//         <button onClick={() => setFilterMonth("")}>Clear</button>
//       </div>

//       {/* Add Transaction Input */}
//       {showInput && (
//         <div className="input-box">
//           <input
//             type="number"
//             placeholder={`Enter ${showInput} amount`}
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <input
//             type="date"
//             value={transactionDate}
//             onChange={(e) => setTransactionDate(e.target.value)}
//           />
//           <button onClick={() => handleAdd(showInput)}>Add</button>
//         </div>
//       )}

//       {/* Transaction List */}
//       <div className="transactions">
//         <h4>Recent Transactions</h4>
//         {filteredTransactions.length === 0 && <p>No transactions yet.</p>}
//         {filteredTransactions.map((t) => (
//           <div key={t.id} className="transaction-item">
//             <span>{t.type === "income" ? "Income" : "Expense"}</span>
//             <span>{t.type === "income" ? `+ ₹${t.value}` : `- ₹${t.value}`}</span>
//             <span>{t.date}</span>
//           </div>
//         ))}
//       </div>

//       {/* Pie Chart */}
//       <div className="chart">
//         <h2>Expense Structure</h2>
//         <PieChart width={300} height={250}>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>

//         {/* Dashboard Gauges */}
//         <Dashboard income={income} expense={expense} />
//       </div>
//     </div>
//   );
// }


// // ✅ keep Dashboard OUTSIDE Home
// function Dashboard({ income, expense }) {
//   const total=income + expense;
//   const incomeData = [
//     { name: "Income", value: income, fill: "#4CAF50" },
//     { name: "Remaining", value: 100 - income, fill: "#ddd" }
//   ];

//   const expenseData = [
//     { name: "Expense", value: expense, fill: "#F44336" },
//     { name: "Remaining", value: 100 - expense, fill: "#ddd" }
//   ];

//   return (
//     <div style={{ display: "flex", gap: "50px" }}>
//       {/* Income Gauge */}
//       <div>
//         <h3>Income</h3>
//         <RadialBarChart
//           width={250}
//           height={250}
//           cx="50%"
//           cy="50%"
//           innerRadius="70%"
//           outerRadius="100%"
//           barSize={20}
//           startAngle={180}
//           endAngle={0}
//           data={incomeData}
//         >
//           <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
//           <RadialBar dataKey="value" cornerRadius={10} />
//           <Legend />
//         </RadialBarChart>
//         <h2>{income}</h2>
//       </div>

//       {/* Expense Gauge */}
//       <div style={{ textAlign: "center" }}>
//         <h3>Expense</h3>
//         <RadialBarChart
//           width={250}
//           height={250}
//           cx="50%"
//           cy="50%"
//           innerRadius="70%"
//           outerRadius="100%"
//           barSize={20}
//           startAngle={180}
//           endAngle={0}
//           data={expenseData}
//         >
//           <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
//           <RadialBar dataKey="value" cornerRadius={10} />
//           <Legend />
//         </RadialBarChart>
//         <h2>{expense}</h2>
//       </div>
//     </div>
//   );
// }













// import React, { useState } from "react";
// import "./styles.css";
// import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";


// export default function Home() {
//   const [originalBalance] = useState(10000); // Example initial balance
//   const [balance, setBalance] = useState(7500);

//   // Dummy Data
//   const income = 5000;
//   const expense = 2500;
//   const savingsGoal = 8000;
//   const recentTransactions = [
//     { id: 1, category: "Food", note: "Lunch", amount: -200, date: "2025-08-20" },
//     { id: 2, category: "Salary", note: "Monthly Pay", amount: 5000, date: "2025-08-15" },
//     { id: 3, category: "Transport", note: "Taxi", amount: -100, date: "2025-08-12" }
//   ];

//   const pieData = [
//     { name: "Food", value: 1200 },
//     { name: "Transport", value: 800 },
//     { name: "Entertainment", value: 500 }
//   ];
//   const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

//   const lineData = [
//     { week: "Week 1", expense: 500 },
//     { week: "Week 2", expense: 800 },
//     { week: "Week 3", expense: 600 },
//     { week: "Week 4", expense: 700 }
//   ];

//   const budgetGoals = [
//     { category: "Food", used: 70 },
//     { category: "Transport", used: 50 },
//     { category: "Entertainment", used: 20 }
//   ];

//   return (
//     <div className="home-container">
      
//       {/* Header */}
//       <header className="header">
//         <h2 className="logo">💰 Finance Tracker</h2>
//         <div className="header-icons">
//           <button>⚙️</button>
//           <button>👤</button>
//         </div>
//       </header>

//       {/* Balance Section */}
//       <section className="balance-card">
//         <h3>Original Balance: ₹{originalBalance}</h3>
//         <h2>Current Balance: ₹{balance}</h2>
//         <progress value={balance} max={originalBalance}></progress>
//         <button className="add-btn">+ Add Transaction</button>
//       </section>

//       {/* Quick Stats */}
//       <section className="quick-stats">
//         <div className="stat-card">💰 Income<br />₹{income}</div>
//         <div className="stat-card">💸 Expenses<br />₹{expense}</div>
//         <div className="stat-card">🎯 Goal Progress<br />{Math.round((balance / savingsGoal) * 100)}%</div>
//       </section>

//       {/* Graphs */}
//       <section className="charts">
//         <div className="chart-card">
//           <h3>Expenses by Category</h3>
//           <PieChart width={250} height={250}>
//             <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
//               {pieData.map((entry, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div className="chart-card">
//           <h3>Weekly Expenses</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={lineData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="week" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="expense" stroke="#ff7300" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       {/* Recent Transactions */}
//       <section className="transactions">
//         <h3>Recent Transactions</h3>
//         <ul>
//           {recentTransactions.map((t) => (
//             <li key={t.id}>
//               <span>{t.category} ({t.note})</span>
//               <span>{t.amount > 0 ? "+" : ""}{t.amount} | {t.date}</span>
//             </li>
//           ))}
//         </ul>
//         <button className="view-all">View All</button>
//       </section>

//       {/* Budget Goals */}
//       <section className="goals">
//         <h3>Budget Goals</h3>
//         {budgetGoals.map((goal, i) => (
//           <div key={i} className="goal-bar">
//             <span>{goal.category} - {goal.used}%</span>
//             <progress value={goal.used} max="100"></progress>
//           </div>
//         ))}
//       </section>

//       {/* Reminders */}
//       <section className="reminders">
//         <h3>Reminders / Insights</h3>
//         <div className="reminder-card">📌 Upcoming: Electricity Bill (₹1200) on Aug 30</div>
//         <div className="reminder-card">💡 You spent 20% more on Food this week</div>
//       </section>

//       {/* Bottom Navigation */}
//       <nav className="bottom-nav">
//         <button>🏠 Home</button>
//         <button>📑 Transactions</button>
//         <button>📊 Analytics</button>
//         <button>👤 Profile</button>
//       </nav>
//     </div>
//   );
// }
















import React, { useState } from "react";
import "./styles.css";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

import img1 from "./assets/a.png"; 
import img2 from "./assets/b.png";
import img7 from "./assets/c.png";

export default function App() {
  const [page, setPage] = useState("welcome");
  const [initialBalance, setInitialBalance] = useState(null);
  const [step, setStep] = useState(1);

  return (
    <div className="app">
      {step === 1 && <WelcomeSlides onNext={() => setStep(2)} />}
      {step === 2 && <Signup onNext={() => setStep(3)} />}
      {step === 3 && <BaseCurrency onNext={() => setStep(4)} />}
      {step === 4 && (
        <SetAmount
          onNext={(amt) => {
            setInitialBalance(amt);
            setStep(5);
          }}
        />
      )}
      {step === 5 && <Home initialBalance={initialBalance} setStep={setStep} />}
      {step === 6 && <Feedback onBack={() => setStep(5)} />}
      {step === 7 && <AboutUs onBack={() => setStep(5)} />}
    </div>
  );
}


// ---------------- Welcome Slides ----------------
function WelcomeSlides({ onNext }) {
  const slides = [
    { img: img1, text: "Welcome to Finance Tracker" },
    { img: img2, text: "Track your expenses easily" },
    { img: img7, text: "Let’s get started!" },
  ];
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="slides">
      <img src={slides[index].img} alt={`Slide ${index + 1}`} width="300" />
      <h1>{slides[index].text}</h1>
      <button onClick={handleNext}>
        {index < slides.length - 1 ? "Next" : "Get Started"}
      </button>
    </div>
  );
}

// ---------------- Signup ----------------
function Signup({ onNext }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  //   axios.post("http://localhost:80/api/user/save",form)  
  //  .then((res) => {
  //     console.log("User saved:", res.data);
  //     onNext();   // ✅ move to next page after success
  //   })
  //   .catch((err) => {
  //     console.error("Error saving user:", err);
  //   });  
       

  }

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="#">Log in</a>
        </p>
      </form>

    </div>
  );
}

// ---------------- Base Currency ----------------
function BaseCurrency({ onNext }) {
  const [currency, setCurrency] = useState("INR");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Select Your Base Currency</h2>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          <option value="INR">₹ Indian Rupee (INR)</option>
          <option value="USD">$ US Dollar (USD)</option>
          <option value="EUR">€ Euro (EUR)</option>
          <option value="GBP">£ British Pound (GBP)</option>
          <option value="JPY">¥ Japanese Yen (JPY)</option>
        </select>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

// ---------------- Set Amount ----------------
function SetAmount({ onNext }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(parseFloat(amount));
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Set Initial Amount</h2>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Go to Home</button>
      </form>
    </div>
  );
}


function Home({ initialBalance,setStep  }) {
  const [originalBalance] = useState(initialBalance || 0); // Example initial balance
  const [balance, setBalance] = useState(initialBalance || 0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [transactions, setTransactions] = useState([]);
 const [budgets, setBudgets] = useState([
    { category: "Food", limit: 3000 },
    { category: "Transport", limit: 2000 },
    { category: "Entertainment", limit: 1500 }
  ]);
  const [reminders, setReminders] = useState([
    { text: "📌 Electricity Bill ₹1200 due on Aug 30" }
  ]);

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  // Add Income or Expense
  const handleAdd = (type) => {
    const amountStr = prompt(`Enter ${type} amount:`);
    const amount = parseFloat(amountStr);
    if (!amount || amount <= 0) return;

    const category = prompt("Enter category (e.g., Food, Salary, Transport):") || "Other";
    const note = prompt("Enter note (optional):") || "";
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (type === "Income") {
      setBalance(balance + amount);
      setIncome(income + amount);
      setTransactions([
        { id: Date.now(), category, note, amount, date, type: "income"  },
        ...transactions
      ]);
    } else {
      setBalance(balance - amount);
      setExpense(expense + amount);
      setTransactions([
        { id: Date.now(), category, note, amount: -amount, date, type: "expense"  },
        ...transactions
      ]);
    }
  };
  // Add new Reminder
  const handleAddReminder = () => {
    const text = prompt("Enter reminder:");
    if (text) {
      setReminders([{ text }, ...reminders]);
    }
  };

  // Expense chart data
  const pieData = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += Math.abs(t.amount);
      } else {
        acc.push({ name: t.category, value: Math.abs(t.amount) });
      }
      return acc;
    }, []);


 // Line chart: group expenses by week
  const lineData = [];
  transactions.filter(t => t.amount < 0).forEach(t => {
    const week = `Week ${Math.ceil(new Date(t.date).getDate() / 7)}`;
    const existing = lineData.find(l => l.week === week);
    if (existing) {
      existing.expense += Math.abs(t.amount);
    } else {
      lineData.push({ week, expense: Math.abs(t.amount) });
    }
  });

const incomePieData = transactions
  .filter((t) => t.type === "income")
  .reduce((acc, t) => {
    const existing = acc.find((item) => item.name === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ name: t.category, value: t.amount });
    }
    return acc;
  }, []);

const incomeLineData = transactions
  .filter((t) => t.type === "income")
  .map((t, index) => ({
    week: `Week ${index + 1}`,
    income: t.amount,
  }));


  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h2 className="logo">💰 Finance Tracker</h2>
        <div className="header-icons">
          <button>⚙️</button>
          <button>👤</button>
        </div>
      </header>

      {/* Balance Section */}
      <section className="balance-card">
        <h3>Original Balance: ₹{originalBalance}</h3>
        <h2>Current Balance: ₹{balance}</h2>
        <progress value={balance} max={originalBalance}></progress>
        <div>
          <button className="add-btn" onClick={() => handleAdd("Income")}>+ Income</button>
          <button className="add-btn" onClick={() => handleAdd("Expense")}>+ Expense</button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stat-card">💰 Income<br />₹{income}</div>
        <div className="stat-card">💸 Expenses<br />₹{expense}</div>
        <div className="stat-card">🎯 Goal Progress<br />{originalBalance ? Math.round((balance / originalBalance) * 100) : 0}%</div>
      </section>

      {/* Charts */}
      <section className="charts">
        <div className="chart-card">
          <h3>Expenses by Category</h3>
          {pieData.length > 0 ? (
            <PieChart width={250} height={250}>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : <p>No expenses yet</p>}
        </div>

        <div className="chart-card">
          <h3>Weekly Expenses</h3>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expense" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          ) : <p>No expense data yet</p>}
        </div>
      </section>



      {/* Transactions */}
      <section className="transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <li key={t.id}>
                <span>{t.category} {t.note && `(${t.note})`}</span>
                <span>{t.amount > 0 ? "+" : ""}{t.amount} | {t.date}</span>
              </li>
            ))
          ) : (
            <li>No transactions yet</li>
          )}
        </ul>
      </section>

    
{/* ✅ Income Charts right under Recent Transactions */}
<section className="charts">
  {/* Income Pie */}
  <div className="chart-card">
    <h3>Income by Category</h3>
    {incomePieData.length > 0 ? (
      <PieChart width={250} height={250}>
        <Pie
          data={incomePieData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
        >
          {incomePieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    ) : (
      <p>No income yet</p>
    )}
  </div>

  {/* Income Line */}
  <div className="chart-card">
    <h3>Weekly Income</h3>
    {incomeLineData.length > 0 ? (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={incomeLineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#0088FE" />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <p>No income data yet</p>
    )}
  </div>
</section>



      {/* Budget Goals */}
      <section className="goals">
        <h3>Budget Goals</h3>
        {budgets.map((b, i) => {
          const spent = transactions.filter(t => t.category === b.category && t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
          const usedPercent = Math.min(100, Math.round((spent / b.limit) * 100));
          return (
            <div key={i} className="goal-bar">
              <span>{b.category} - {usedPercent}% of ₹{b.limit}</span>
              <progress value={usedPercent} max="100"></progress>
            </div>
          );
        })}
      </section>

      {/* Reminders */}
      <section className="reminders">
        <h3>Reminders / Insights</h3>
        <button onClick={handleAddReminder}>+ Add Reminder</button>
        {reminders.map((r, i) => (
          <div key={i} className="reminder-card">{r.text}</div>
        ))}
      </section>


<nav className="bottom-nav">
  <button onClick={() => setStep(5)}>🏠 Home</button>
  <button onClick={() => setStep(5)}>📑 Transactions</button> 
  <button onClick={() => setStep(5)}>📊 Analytics</button>
  <button onClick={() => setStep(5)}>👤 Profile</button>
  <button onClick={() => setStep(6)}>💬 Feedback</button>
  <button onClick={() => setStep(7)}>ℹ️ About</button>
</nav>

    </div>
  );
}


function Feedback({ onBack }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("✅ Thank you for your feedback!");
    // e.target.reset();
    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message")    
  };


    try {
      await axios.post("http://localhost:80/api/feedback", data, {
  headers: { 'Content-Type': 'application/json' }
});

      alert("✅ Feedback saved to database!");
      e.target.reset();
    } catch (err) {
      alert("❌ Error saving feedback");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>💬 Feedback</h2>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Write your feedback..." required></textarea>
        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>⬅ Back</button>
      </form>
    </div>
  );
}

function AboutUs({ onBack }) {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>ℹ️ About Us</h2>
<p>
  At <b>Finance Tracker</b>, we believe that managing money should be simple,
  smart, and stress-free. Our platform helps you record your income and
  expenses, set budgets, track savings, and gain insights through interactive
  charts and reports. Whether you’re a student learning financial discipline,
  a professional planning monthly budgets, or a family aiming to save for the
  future, Finance Tracker is designed to support you every step of the way. 🌱
  <br /><br />
  Our mission is to empower individuals to take control of their finances with
  clarity and confidence, making financial freedom a reality for everyone. 🚀
</p>

        <button onClick={onBack}>⬅ Back</button>
      </div>
    </div>
  );
}

