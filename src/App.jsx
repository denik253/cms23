  import { React, useState } from "react";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import { Link } from "react-router-dom";
  import EventList from "./component/eventList";
  import Event from "./component/event";
  import AddEventForm from "./component/addEventForm";
  import Register from "./component/login/Registration";
  import Login from "./component/login/LoginForm";
  import ChatBotSettings from "./component/chatBot/chatBotSettings"
  import ChatBotButton from "./component/chatBot/chatBotButton";
  import ChatBotDialog from "./component/chatBot/chatBotDialog"

  const Home = () => (
    <div id="content-container">
      <h1>Welcome to My Site!</h1>
    </div>
  );
  const About = () => (
    <div id="content-container">
      <h1>About Us</h1>
    </div>
  );
  const Contact = () => (
    <div id="content-container">
      <h1>Contact</h1>
    </div>
  );

  const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [email, setEmail] = useState(localStorage.getItem("email"));

    const handleLogin = (data) => {
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", data.email);
      setToken(data.idToken);
      setEmail(data.email);
    };

    return (
      <Router>
        <div>
          <div id="nav">
            <Link to="./">Головна</Link>
            <Link to="./events">Публікації</Link>
            <Link to="./about">Про нас</Link>
            <Link to="./contact">Контакти</Link>
            {!token && <Link to="./login">Увійти</Link>}
            {token && (
              <Link
                to="./"
                onClick={() => {
                  localStorage.clear();
                  setToken(null);
                  setEmail(null);
                }}
              >
                Вийти
              </Link>
            )}  
          </div>
          <Routes>
            <Route path="./" element={<Home />} />
            <Route path="./test" element={<ChatBotDialog />} />
            <Route
              path="./events"
              element={
                <>
                  <EventList tabName="events" />
                  <ChatBotButton />
                </>
              }
            />
            <Route
              path="/events/:eventId"
              element={<Event tabName="events" />}
            />
            <Route
              path="/events/add"
              element={<AddEventForm tabName="events" />}
            />
            <Route
              path="/about"
              element={
                <>
                  <About />
                  <ChatBotButton />
                </>
              }
            />
            <Route path="./contact" element={<Contact />} />
            <Route path="./login" element={<Login onLogin={handleLogin} />} />
            <Route path="./registration" element={<Register />} />
            <Route path="./chatBotSettings" element={<ChatBotSettings />} />
          </Routes>
        </div>
      </Router>
    );
  };
  export default App;
