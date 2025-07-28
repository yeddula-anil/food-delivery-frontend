import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getRevenueMonthly,
  getRevenueByCategoryWise,
} from "../../../components/Redux/Revenue/Action";
import { getRestaurantByUserId, updateRestaurantStatus } from "../../../components/Redux/Restaurant/Action";

const RevenueCircle = ({ label, amount, isActive, onClick }) => (
  <div className="flex flex-col items-center mb-6">
    <span className="mb-2 font-medium text-gray-700">{label} Revenue</span>
    <button
      onClick={onClick}
      className={`w-20 h-20 rounded-full flex items-center justify-center text-sm font-bold transition duration-300 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "border-4 border-blue-400 text-blue-600 bg-transparent hover:bg-blue-100"
      }`}
    >
      ₹{amount}
    </button>
  </div>
);

const Dashboard = () => {
  const [activeType, setActiveType] = useState("daily");
  const [barChartData, setBarChartData] = useState([]);
  const res=useSelector(state=>state.restaurant.userRestaurant)
  console.log("resss",res)
  const [status,setStatus]=useState(res?.open)
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const revenueState = useSelector((state) => state.revenue);
  const categoryWise = revenueState?.categoryWise?.data || {};
  const monthlyRevenue = revenueState?.monthly?.data || [];
  console.log(monthlyRevenue,"monthly")

  useEffect(() => {
    if (jwt) {
      dispatch(getRevenueByCategoryWise(jwt));
      dispatch(getRevenueMonthly(jwt));
      dispatch(getRestaurantByUserId(jwt));
    }
  }, [dispatch, jwt]);
   useEffect(() => {
    if (res?.open !== undefined) {
      setStatus(res.open);
    }
  }, [res]);

  const handleRestaurantStatus = async () => {
    if (res?.id) {
      await dispatch(updateRestaurantStatus(jwt, res.id));
      setStatus(!status)
      // Refresh restaurant data
      await dispatch(getRestaurantByUserId(jwt));
    }
  };

  useEffect(() => {
    if (categoryWise && categoryWise[activeType]) {
      const raw = categoryWise[activeType];
      const transformed = Object.entries(raw).map(([category, revenue]) => ({
        category,
        revenue: typeof revenue === "number" ? revenue : Number(revenue),
      }));
      setBarChartData(transformed);
    }
  }, [activeType, categoryWise]);

  const dailyTotal = categoryWise?.daily
    ? Object.values(categoryWise.daily).reduce((a, b) => a + Number(b), 0)
    : 0;
  const monthlyTotal = categoryWise?.monthly
    ? Object.values(categoryWise.monthly).reduce((a, b) => a + Number(b), 0)
    : 0;
  const yearlyTotal = categoryWise?.yearly
    ? Object.values(categoryWise.yearly).reduce((a, b) => a + Number(b), 0)
    : 0;

  return (
    <div className="p-6 min-h-screen bg-transparent">
      <div className="p-6 rounded-xl shadow-lg grid grid-cols-4 gap-6 bg-transparent">
        {/* Left Section */}
        <div className="col-span-3 space-y-6">
          {/* Monthly Revenue Line Chart */}
          <div className="p-4 rounded-lg shadow bg-white/70 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">Monthly Revenue Trends</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                  data={
                    monthlyRevenue && typeof monthlyRevenue === "object"
                      ? Object.entries(monthlyRevenue).map(([month, revenue]) => ({
                          month,
                          revenue: Number(revenue)
                        }))
                      : []
                  }
                >

                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Category Wise Revenue */}
          <div className="p-4 rounded-lg shadow bg-white/70 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2 capitalize">
              {activeType} Revenue by Category
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-1 p-4 rounded-lg shadow bg-white/70 backdrop-blur flex flex-col items-center">
          <button onClick={handleRestaurantStatus} className={`mb-6 px-4 py-2 text-white rounded transition ${
  status ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
}`}
 >

            {status?'close restaurant':'open restaurant'}
          </button>

          <RevenueCircle
            label="Daily"
            amount={dailyTotal}
            isActive={activeType === "daily"}
            onClick={() => setActiveType("daily")}
          />
          <RevenueCircle
            label="Monthly"
            amount={monthlyTotal}
            isActive={activeType === "monthly"}
            onClick={() => setActiveType("monthly")}
          />
          <RevenueCircle
            label="Yearly"
            amount={yearlyTotal}
            isActive={activeType === "yearly"}
            onClick={() => setActiveType("yearly")}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
