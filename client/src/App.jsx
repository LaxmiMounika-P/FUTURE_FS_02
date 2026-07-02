import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "Website",
    status: "New",
    notes: "",
  });

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");

      setLeads(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD LEAD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/leads", formData);

      setLeads([res.data, ...leads]);

      toast.success("🎉 Lead Added Successfully!");

      setFormData({
        name: "",
        email: "",
        source: "Website",
        status: "New",
        notes: "",
      });
    } catch (error) {
      console.log(error);

      toast.error("❌ Failed To Add Lead");
    }
  };

  // DELETE LEAD
  // DELETE LEAD
  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`);

      setLeads(leads.filter((lead) => lead._id !== id));

      toast.error("Lead Deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    toast.success("Logged Out Successfully!");

    setTimeout(() => {
      window.close();
    }, 1500);
  };

  // FILTERED LEADS
  const filteredLeads = leads.filter((lead) =>
    filter === "All" ? true : lead.status === filter,
  );

  // PIE DATA
  const pieData = [
    {
      name: "New",
      value: leads.filter((lead) => lead.status === "New").length,
    },
    {
      name: "Contacted",
      value: leads.filter((lead) => lead.status === "Contacted").length,
    },
    {
      name: "Converted",
      value: leads.filter((lead) => lead.status === "Converted").length,
    },
  ];

  // SOURCE DATA
  const sourceData = [
    {
      source: "Website",
      count: leads.filter((lead) => lead.source === "Website").length,
    },
    {
      source: "LinkedIn",
      count: leads.filter((lead) => lead.source === "LinkedIn").length,
    },
    {
      source: "Instagram",
      count: leads.filter((lead) => lead.source === "Instagram").length,
    },
    {
      source: "Referral",
      count: leads.filter((lead) => lead.source === "Referral").length,
    },
  ];

  // MONTHLY DATA
  const monthlyData = [
    { month: "Jan", joined: 12, lost: 2 },
    { month: "Feb", joined: 18, lost: 3 },
    { month: "Mar", joined: 25, lost: 5 },
    { month: "Apr", joined: 30, lost: 7 },
    { month: "May", joined: 35, lost: 8 },
  ];

  const COLORS = ["#7b2ff7", "#00c6ff", "#4caf50"];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f4f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          background: "linear-gradient(to bottom, #7b2ff7, #00c6ff)",
          color: "white",
          padding: "25px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>LeadFlow</h1>

          <div
            onClick={() => setActivePage("Dashboard")}
            style={{
              ...sidebarItem,
              backgroundColor:
                activePage === "Dashboard"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
          >
            📊 Dashboard
          </div>

          <div
            onClick={() => setActivePage("Leads")}
            style={{
              ...sidebarItem,
              backgroundColor:
                activePage === "Leads"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
          >
            👥 Leads
          </div>

          <div
            onClick={() => setActivePage("Analytics")}
            style={{
              ...sidebarItem,
              backgroundColor:
                activePage === "Analytics"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
          >
            📈 Analytics
          </div>

          <div
            onClick={() => setActivePage("Settings")}
            style={{
              ...sidebarItem,
              backgroundColor:
                activePage === "Settings"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
          >
            ⚙ Settings
          </div>
        </div>

        {/* BOTTOM */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: "#7b2ff7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              M
            </div>

            <div>
              <h4 style={{ margin: 0 }}>Admin</h4>
              <p style={{ margin: 0, fontSize: "12px" }}>CRM Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "white",
              color: "#7b2ff7",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          padding: "25px",
          backgroundColor: darkMode ? "#121212" : "#f4f7fb",
        }}
      >
        {/* TOP NAVBAR */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <h2 style={{ margin: 0, color: "#333" }}>Welcome Back 👋</h2>

            <p style={{ margin: 0, color: "gray" }}>
              Manage your leads smartly
            </p>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("leadForm")
                .scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "linear-gradient(to right, #7b2ff7, #00c6ff)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ➕ Add Lead
          </button>
        </div>

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <>
            {/* ANALYTICS CARDS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <div style={cardStyle}>
                <h3>📊 Total Leads</h3>
                <h1>{leads.length}</h1>
              </div>

              <div style={cardStyle}>
                <h3>📞 Contacted</h3>
                <h1>
                  {leads.filter((lead) => lead.status === "Contacted").length}
                </h1>
              </div>

              <div style={cardStyle}>
                <h3>✅ Converted</h3>
                <h1>
                  {leads.filter((lead) => lead.status === "Converted").length}
                </h1>
              </div>

              <div style={cardStyle}>
                <h3>⭐ Qualified</h3>
                <h1>{leads.filter((lead) => lead.status === "New").length}</h1>
              </div>
            </div>

            {/* PIPELINE */}
            <div style={{ ...cardStyle, marginBottom: "30px" }}>
              <h2>Lead Pipeline</h2>

              <div style={{ marginTop: "20px" }}>
                <p>New Leads</p>

                <div style={progressBg}>
                  <div
                    style={{
                      ...progressFill,
                      width: `${
                        (leads.filter((lead) => lead.status === "New").length /
                          (leads.length || 1)) *
                        100
                      }%`,
                      backgroundColor: "#ff9800",
                    }}
                  ></div>
                </div>

                <p>Contacted</p>

                <div style={progressBg}>
                  <div
                    style={{
                      ...progressFill,
                      width: `${
                        (leads.filter((lead) => lead.status === "Contacted")
                          .length /
                          (leads.length || 1)) *
                        100
                      }%`,
                      backgroundColor: "#00c6ff",
                    }}
                  ></div>
                </div>

                <p>Converted</p>

                <div style={progressBg}>
                  <div
                    style={{
                      ...progressFill,
                      width: `${
                        (leads.filter((lead) => lead.status === "Converted")
                          .length /
                          (leads.length || 1)) *
                        100
                      }%`,
                      backgroundColor: "#4caf50",
                    }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => setActivePage("Analytics")}
                style={analyticsBtn}
              >
                Show Full Analytics
              </button>
            </div>

            {/* RECENT LEADS */}
            <div style={cardStyle}>
              <h2>Recently Added Leads</h2>

              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead._id}
                  style={{
                    backgroundColor: "#f9fbff",
                    borderRadius: "12px",
                    padding: "15px",
                    marginTop: "15px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 120px 150px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{lead.name}</strong>
                  </div>

                  <div>{lead.email}</div>

                  <div>{lead.status}</div>

                  <div>{new Date(lead.createdAt).toLocaleDateString()}</div>
                </div>
              ))}

              <button
                onClick={() => setActivePage("Leads")}
                style={analyticsBtn}
              >
                View All Leads
              </button>
            </div>

            {/* FORM */}
            <form
              id="leadForm"
              onSubmit={handleSubmit}
              style={{
                ...cardStyle,
                marginTop: "30px",
              }}
            >
              <h2>Add New Lead</h2>

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Website">🌐 Website</option>
                <option value="LinkedIn">💼 LinkedIn</option>
                <option value="Instagram">📸 Instagram</option>
                <option value="Referral">🤝 Referral</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="New">🆕 New</option>
                <option value="Contacted">📞 Contacted</option>
                <option value="Converted">✅ Converted</option>
              </select>

              <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  height: "100px",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "none",
                  borderRadius: "10px",
                  background: "linear-gradient(to right, #7b2ff7, #00c6ff)",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ➕ Add Lead
              </button>
            </form>
          </>
        )}

        {/* LEADS PAGE */}
        {activePage === "Leads" && (
          <div style={cardStyle}>
            <h1>👥 Leads Management</h1>

            <div
              style={{
                marginTop: "25px",
                backgroundColor: "#e9f2ff",
                padding: "15px",
                borderRadius: "12px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 100px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <div>Name</div>
              <div>Email</div>
              <div>Source</div>
              <div>Status</div>
              <div>Delete</div>
            </div>

            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "12px",
                  marginTop: "15px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 100px",
                  alignItems: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <div>{lead.name}</div>
                <div>{lead.email}</div>
                <div>{lead.source}</div>
                <div>{lead.status}</div>

                <button
                  onClick={() => deleteLead(lead._id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS PAGE */}
        {activePage === "Analytics" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              {/* PIE CHART */}
              <div style={cardStyle}>
                <h2>Lead Conversion Analysis</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={100} label>
                      {pieData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <div>🟠 New</div>
                  <div>🔵 Contacted</div>
                  <div>🟢 Converted</div>
                </div>
              </div>

              {/* SOURCE CHART */}
              <div style={cardStyle}>
                <h2>Lead Sources</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sourceData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#7b2ff7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* MONTHLY */}
            <div
              style={{
                ...cardStyle,
                marginTop: "30px",
              }}
            >
              <h2>Monthly Trends</h2>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="joined"
                    stroke="#00c6ff"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="lost"
                    stroke="#ff4d4d"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* SETTINGS */}
        {activePage === "Settings" && (
          <div style={cardStyle}>
            <h1>⚙ Settings</h1>

            <div
              style={{
                marginTop: "30px",
              }}
            >
              <div style={settingRow}>
                <span>🌙 Dark Mode</span>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    width: "60px",
                    height: "30px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: darkMode ? "#7b2ff7" : "#ccc",
                    cursor: "pointer",
                  }}
                ></button>
              </div>

              <div style={settingRow}>
                <span>🔔 Notifications</span>

                <button
                  style={{
                    width: "60px",
                    height: "30px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#7b2ff7",
                  }}
                ></button>
              </div>

              <div style={settingRow}>
                <span>🔒 Security Alerts</span>

                <button
                  style={{
                    width: "60px",
                    height: "30px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#7b2ff7",
                  }}
                ></button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "22px",
  borderRadius: "18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const sidebarItem = {
  padding: "14px",
  borderRadius: "12px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.3s",
};

const progressBg = {
  width: "100%",
  height: "12px",
  backgroundColor: "#ddd",
  borderRadius: "10px",
  marginBottom: "20px",
};

const progressFill = {
  height: "100%",
  borderRadius: "10px",
};

const analyticsBtn = {
  marginTop: "20px",
  padding: "12px 20px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(to right, #7b2ff7, #00c6ff)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const settingRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 0",
  borderBottom: "1px solid #ddd",
};

export default App;
