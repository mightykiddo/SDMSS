export default function App() {
    const staff = [
      { user: "staff1234", pwd: "pwd1234" },
      { user: "staff1235", pwd: "pwd1235" }
    ];
    const [user, setUser] = useState("");
    const [password, setPwd] = useState("");
    const [display, setDisplay] = useState(false);
    const [display2, setDisplay2] = useState(false);
    function handleSubmit(d) {
      d.preventDefault();
      console.log("user", user);
      console.log("password", password);
      let result = staff
        .filter((stf) => stf.user === user)
        .map((stf) => stf.user);
      console.log(result);
      let result2 = staff
        .filter((stf) => stf.pwd === password)
        .map((stf) => stf.pwd);
      console.log(result2);
      if (result.length !== 0 && result2.length !== 0) {
        console.log("Login Successful");
        setDisplay(true);
      } else {
        console.log("Login failed");
        setDisplay2(true);
        setDisplay(false);
      }
    }
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPwd(e.target.value)}
          />
          <button>Submit</button>
        </form>
        {display && (
          <div>
            <h1>Login Successful</h1>
          </div>
        )}
        {display2 && (
          <div>
            <h1>Login Fail</h1>
          </div>
        )}
      </div>
    );
  }
  