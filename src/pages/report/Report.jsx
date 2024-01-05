import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { error, success } from "../../common/sweetalert2.js";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import "./style.scss";
import { GET_ALL_REPORT_PRODUCT, GET_ALL_REPORT_INVOICE } from "../service.js";
import setting from "../../setting.js";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Report() {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = React.useState({ option: true, time: "MONTH" });
  const [listData, setListData] = useState([]);

  const testData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAction(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAction = async (isOption, data) => {
    setAction(prevData => ({
      ...prevData,
      option: isOption,
    }));
    isOption ? getAllReportProduct() : getAllReportInvoice();
  };

  const getAllReportProduct = async () => {
    try {
      setLoading(true);
      let listReceipt;
      await GET_ALL_REPORT_PRODUCT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listReceipt = res.data.data;
          setListData(listReceipt);
        }
      });
    } catch (err) {
      error("Error fetching data:", err);
      setLoading(false);
    }
  };

  const getAllReportInvoice = async () => {
    try {
      setLoading(true);
      let listExport;
      await GET_ALL_REPORT_INVOICE().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listExport = res.data.data;
          setListData(listExport);
        }
      });
    } catch (err) {
      error("Error fetching data:", err);
      setLoading(false);
    }
  };

  const exportExcel = ({ data, fileName }) => {
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
      <button onClick={exportToExcel}>
        Export to Excel
      </button>
    );
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getAllReportProduct();
      getAllReportInvoice();
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <div className="d-flex justify-content-between mt-20">
              <span className="fw-700 pl-10 title-page font-30">
                Báo cáo thống kê
              </span>
            </div>
            <div className="row mt-20">
              <div className="col-md-2 mt-10">
                <div
                  className="form-check"
                  onClick={() => handleAction(true, setting.ACTION.ADD)}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio1"
                    name="optradio"
                    value="option1"
                    checked={action.option}
                    readOnly
                  />
                  Hóa đơn
                </div>
                <div
                  className="form-check mt-20"
                  onClick={() => handleAction(false, setting.ACTION.ADD)}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio2"
                    name="optradio"
                    value="option2"
                    checked={!action.option}
                    readOnly
                  />
                  Sản phẩm
                </div>
                <div className="mt-30">
                  <label htmlFor="">Thời gian</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={action.time}
                    onChange={handleInputChange}
                    name="time"
                  >
                    <option value="" disabled>
                      Chọn thời gian
                    </option>
                    {Object.values(setting.REPORT_TYPE).map(e => (
                      <option key={e.code} value={e.code}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="mt-20 btn btn-primary"
                  onClick={() =>
                    exportExcel(setting.ACTION.OPEN, setting.ACTION.ADD, {})
                  }
                >
                  <FontAwesomeIcon
                    className="icon-add mr-10"
                    icon="fas fa-file-excel"
                  />
                  Xuất excel
                </button>
              </div>
              <div className="col-md-10 mt-10">
                <AreaChart
                  width={730}
                  height={250}
                  data={testData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
